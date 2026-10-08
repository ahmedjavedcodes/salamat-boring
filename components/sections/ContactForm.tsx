'use client';

import { useId, useRef, useState } from 'react';

import { WhatsAppIcon } from '@/components/illustrations/icons';
import { Field, controlClasses } from '@/components/ui/Field';
import { buttonClasses } from '@/components/ui/buttonStyles';
import type { ContactFormCopy } from '@/lib/content/types';
import { compactLines, fill, isPakistaniMobile } from '@/lib/utils/format';
import { whatsappUrl } from '@/lib/utils/whatsapp';

type FieldName = 'name' | 'area' | 'phone' | 'service' | 'details';
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const emptyValues: Values = { name: '', area: '', phone: '', service: '', details: '' };

/**
 * Composes a structured WhatsApp message and opens it (CLAUDE.md §5.3). Nothing is sent
 * to or stored on a server, which is what the helper text under the button says.
 *
 * The phone field is optional: WhatsApp already carries the sender's number, so this is
 * only for a callback on a different one. It is validated when filled (§7.4).
 */
export function ContactForm({ dict }: { dict: ContactFormCopy }) {
  const prefix = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (name: FieldName) => `${prefix}-${name}`;

  const validate = (next: Values): Errors => {
    const found: Errors = {};
    if (!next.name.trim()) found.name = dict.fields.name.required;
    if (!next.area.trim()) found.area = dict.fields.area.required;
    if (!next.service) found.service = dict.fields.service.required;
    if (!next.details.trim()) found.details = dict.fields.details.required;
    if (next.phone.trim() && !isPakistaniMobile(next.phone)) {
      found.phone = dict.fields.phone.invalid;
    }
    return found;
  };

  const update = (name: FieldName, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Clear a message as soon as the field is fixed, but never add one mid-typing.
    if (errors[name] && !validate(next)[name]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const onBlur = (name: FieldName) => {
    const found = validate(values);
    setErrors((previous) => ({ ...previous, [name]: found[name] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setSubmitted(true);

    const firstInvalid = (['name', 'area', 'phone', 'service', 'details'] as const).find(
      (name) => found[name],
    );
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    const serviceLabel =
      dict.fields.service.options.find((option) => option.value === values.service)?.label ??
      values.service;

    const message = compactLines(
      fill(dict.messageTemplate, {
        name: values.name.trim(),
        area: values.area.trim(),
        phoneLine: values.phone.trim()
          ? fill(dict.phoneLineTemplate, { phone: values.phone.trim() })
          : '',
        service: serviceLabel,
        details: values.details.trim(),
      }),
    );

    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <h3 className="display-type text-aquifer text-xl">{dict.heading}</h3>

      {submitted && errorCount > 0 ? (
        <p role="alert" className="text-alert text-base">
          {dict.errorSummary}
        </p>
      ) : null}

      <Field id={fieldId('name')} label={dict.fields.name.label} error={errors.name}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            onBlur={() => onBlur('name')}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={controlClasses(invalid)}
          />
        )}
      </Field>

      <Field
        id={fieldId('area')}
        label={dict.fields.area.label}
        hint={dict.fields.area.hint}
        error={errors.area}
      >
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="area"
            type="text"
            value={values.area}
            onChange={(event) => update('area', event.target.value)}
            onBlur={() => onBlur('area')}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={controlClasses(invalid)}
          />
        )}
      </Field>

      <Field
        id={fieldId('phone')}
        label={dict.fields.phone.label}
        hint={dict.fields.phone.hint}
        error={errors.phone}
      >
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            onBlur={() => onBlur('phone')}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={controlClasses(invalid, 'text-start')}
          />
        )}
      </Field>

      <Field id={fieldId('service')} label={dict.fields.service.label} error={errors.service}>
        {({ id, describedBy, invalid }) => (
          <select
            id={id}
            name="service"
            value={values.service}
            onChange={(event) => update('service', event.target.value)}
            onBlur={() => onBlur('service')}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={controlClasses(invalid)}
          >
            <option value="">{dict.fields.service.placeholder}</option>
            {dict.fields.service.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id={fieldId('details')} label={dict.fields.details.label} error={errors.details}>
        {({ id, describedBy, invalid }) => (
          <textarea
            id={id}
            name="details"
            rows={4}
            value={values.details}
            onChange={(event) => update('details', event.target.value)}
            onBlur={() => onBlur('details')}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={controlClasses(invalid)}
          />
        )}
      </Field>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          data-track="whatsapp_click"
          data-source="contact_form"
          className={buttonClasses('whatsapp', 'lg', 'self-start')}
        >
          <WhatsAppIcon className="shrink-0" />
          <span>{dict.submit}</span>
        </button>
        <p className="text-ink/70 text-sm">{dict.helper}</p>
      </div>
    </form>
  );
}
