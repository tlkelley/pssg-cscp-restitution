import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CRMBoolean, IOptionSetVal, ResitutionForm } from "../../enums-list";
import { POSTAL_CODE } from "../../regex.constants";
import { EmailValidator } from "../../validators/email.validator";

export class RestitutionInfoHelper {
    postalRegex = POSTAL_CODE;
  public setupFormGroup(fb: FormBuilder, form_type: IOptionSetVal): FormGroup {
    let contactInformationGroup: FormGroup;
    if (form_type.val === ResitutionForm.VictimEntity.val) {
      contactInformationGroup = fb.group({
        entityContacts: fb.array([this.createEntityContact(fb, form_type)]),
        mailingAddress: fb.group({
          line1: ['', [Validators.required]],
          line2: [''],
          city: ['', [Validators.required]],
          postalCode: ['', [Validators.required, Validators.pattern(this.postalRegex)]],
          province: [{ value: 'British Columbia', disabled: false }, [Validators.required]],
          country: [{ value: 'Canada', disabled: false }, [Validators.required]],
        }),
        attentionTo: [''],

      });
    } else {

    contactInformationGroup = fb.group({
      entityContacts: fb.array([this.createEntityContact(fb, form_type)]),
      mailingAddress: fb.group({
        line1: ['', [Validators.required]],
        line2: [''],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required, Validators.pattern(this.postalRegex)]],
        province: [{ value: 'British Columbia', disabled: false }, [Validators.required]],
        country: [{ value: 'Canada', disabled: false }, [Validators.required]],
      }),
      attentionTo: [''],
      preferredMethodOfContact: [null, [Validators.min(1), Validators.max(100000002)]], // Phone = 2, Email = 1, Mail = 4, Alternate Mail = 100000002
      smsPreferred: [null],
      phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(15)]],
      alternatePhoneNumber: [''],
      leaveVoicemail: [null],
      email: ['', [Validators.email]],
      confirmEmail: ['', [
        Validators.email,
        EmailValidator('email')
      ]],
    });
  }

        let group = {
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],

            iHaveOtherNames: [''],
            otherFirstName: [''],
            otherLastName: [''],

            birthDate: ['', [Validators.required]],
            gender: [null],
            indigenousStatus: [null, [Validators.required, Validators.min(100000000), Validators.max(100000004)]],

            authorizeDesignate: ['', Validators.required],
          designate: fb.array([]),
          offendercustodylocation: [''],
          contactInformation: contactInformationGroup,
          
            courtFiles: fb.array([this.createCourtFile(fb, form_type)]),
            documents: fb.array([]),
            declaredAndSigned: ['', Validators.requiredTrue],
            signature: ['', Validators.required],
        }

        if (form_type.val === ResitutionForm.Victim.val || form_type.val === ResitutionForm.VictimEntity.val) {
            group["vsw"] = fb.array([this.createVSW(fb)]);
        }

        if (form_type.val === ResitutionForm.Offender.val) {
            group["probationOfficerFirstName"] = [''];
            group["probationOfficerLastName"] = [''];
            group["probationOfficerCustodyLocation"] = [''];
            group["probationOfficerPhoneNumber"] = [''];
            group["probationOfficerEmail"] = ['', [Validators.email]];
        }

        if (form_type.val === ResitutionForm.VictimEntity.val) {
            let today = new Date();
            group["signatureName"] = ['', Validators.required];
            group["signerTitle"] = ['', Validators.required];
            group["signatureDate"] = [today, Validators.required];
        }

        return fb.group(group);
    }

    createCourtFile(fb: FormBuilder, form_type: IOptionSetVal): FormGroup {
        let group = {
            fileNumber: [''],
            location: [''],
        };

        if (form_type.val === ResitutionForm.Victim.val || form_type.val === ResitutionForm.VictimEntity.val) {
            group["firstName"] = [''];
            group["middleName"] = [''];
            group["lastName"] = [''];
            group["relationship"] = [''];
        }

        return fb.group(group);
    }

    createDesignate(fb: FormBuilder): FormGroup {
        return fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            preferredName: [''],
            actOnBehalf: [false],
        });
    }

    createVSW(fb: FormBuilder): FormGroup {
        return fb.group({
            firstName: [''],
            lastName: [''],
            program: [''],
            phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(15)]],
            email: ['', [Validators.email]],
        });
    }

  createEntityContact(fb: FormBuilder, form_type: IOptionSetVal): FormGroup {
      let group = {
          firstName: [''],
          lastName: [''],
      };
      if (form_type.val === ResitutionForm.VictimEntity.val) {
        group["relationship"] = [''];
        group["contactTitle"] = ['', [Validators.minLength(1), Validators.maxLength(50)]];
        group["isPrimaryContact"] = [CRMBoolean.False];
        group["preferredMethodOfContact"] = [null, [Validators.min(1), Validators.max(100000002)]]; // Phone = 2, Email = 1, Mail = 4, Alternate Mail = 100000002
        group["smsPreferred"] = [null];
        group["phoneNumber"] = ['', [Validators.minLength(10), Validators.maxLength(15)]];
        group["alternatePhoneNumber"] = [''];
        group["email"] = ['', [Validators.email]],
          group["confirmEmail"] = ['', [
            Validators.email,
            EmailValidator('email')
          ]],
          group["leaveVoicemail"] = [null];
      }

      return fb.group(group);
    }
}

