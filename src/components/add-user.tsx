"use client"

import { useCallback, useEffect, useState } from "react";

export default function AddUserComponent({ onUserAdded }: { onUserAdded: (user: any) => void }) {
    type FormField = {
        value: string | number;
        valid?: boolean;
        required: boolean;
        pattern?: RegExp;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        errors: string[];
    };

    type FormType = {
        rut: FormField;
        nombres: FormField;
        apellidos: FormField;
        fechaNacimiento: FormField;
        edad: FormField;
        sexo: FormField;
        saldo: FormField;
    };

    const [form, setForm] = useState<FormType>({
        rut: {
            value: '',
            required: true,
            pattern: /\d{1,3}(?:\.\d{3}){2}-[0-9kK]$/,
            minLength: 11,
            maxLength: 12,
            errors: []
        },
        nombres: {
            value: '',
            required: true,
            pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
            minLength: 3,
            maxLength: 50,
            errors: []
        },
        apellidos: {
            value: '',
            required: true,
            pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
            minLength: 3,
            maxLength: 50,
            errors: []
        },
        fechaNacimiento: {
            value: '',
            required: true,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
            minLength: 10,
            maxLength: 10,
            errors: []
        },
        edad: {
            value: 0,
            valid: false,
            required: false,
            pattern: /^\d+$/,
            min: 1,
            max: 120,
            errors: []
        },
        sexo: {
            value: '',
            valid: false,
            required: true,
            pattern: /^(M|F)$/,
            errors: []
        },
        saldo: {
            value: 0,
            valid: false,
            required: true,
            pattern: /^\d+$/,
            min: 1,
            max: 999999999,
            errors: []
        },
    });

    const validateRut = (field: FormField) => {
        let rut = field.value.toString().replace(/[^0-9kK]/g, '').toUpperCase();

        if (rut.length < 8) {
            return { valid: false, errors: [] };
        }

        let cuerpo = rut.slice(0, -1);
        let dv = rut.slice(-1);
        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        let dvEsperado: any = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

        return { valid: dv === dvEsperado, errors: dv !== dvEsperado ? ['El RUT ingresado es inválido.'] : [] };
    }

    const formatRut = (value: string) => {
        const cleanedValue = value.replace(/[^0-9kK]/g, '').toUpperCase();

        if (cleanedValue.length < 2) {
            return cleanedValue;
        }

        let parteNumerica = parseInt(cleanedValue.substring(0, cleanedValue.length - 1));
        let dv = cleanedValue[cleanedValue.length - 1];
        let rut = parteNumerica.toLocaleString('es-CL') + '-' + dv;

        console.log(`Formatted RUT: ${rut}`);

        return rut;
    }

    const validateField = (fieldName: string, field: FormField) => {
        let errors = [];

        if (fieldName === 'rut') {
            let rutValidation = validateRut(field);
            if (!rutValidation.valid) {
                errors.push(...rutValidation.errors);
            }
        }

        if (field.required && String(field.value).trim() === '') {
            errors.push('El campo es obligatorio.');
        }

        if (field.pattern && !field.pattern.test(field.value.toString())) {
            errors.push(`Debe cumplir con el formato requerido ${field.pattern.toString()}.`);
        }

        if (field.minLength && String(field.value).length < field.minLength) {
            errors.push(`El largo minimo es ${field.minLength}.`);
        }

        if (field.maxLength && String(field.value).length > field.maxLength) {
            errors.push(`El largo maximo es ${field.maxLength}.`);
        }

        if (field.min && parseInt(String(field.value)) < field.min) {
            errors.push(`El valor minimo es ${field.min}.`);
        }

        if (field.max && parseInt(String(field.value)) > field.max) {
            errors.push(`El valor maximo es ${field.max}.`);
        }

        let valid = errors.length === 0;

        return { valid: valid, errors: errors };
    }

    const handleValueChange = (e: any) => {
        const { id, value } = e.target;

        let fieldName: string = id.toUpperCase().includes('SEXO') ? 'sexo' : id;

        let field = form[fieldName as keyof FormType];

        console.log(fieldName, field);

        let formatedValue = value;

        if (id === 'rut') {
            formatedValue = formatRut(value);
        }

        if (id === 'fechaNacimiento') {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            let edadField = form.edad;

            edadField.valid = true;

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                edadField.value = age - 1;
            } else {
                edadField.value = age;
            }

            if (edadField.value < 0) {
                edadField.value = 0;
            }

            let edadValidations = validateField('edad', edadField);

            edadField.valid = edadValidations.valid;
            edadField.errors = edadValidations.errors;

            setForm({ ...form, edad: edadField });
        }

        if (id === 'sexoM' || id === 'sexoF') {
            formatedValue = id === 'sexoM' ? 'M' : 'F';

            if (!e.target.checked) {
                formatedValue = '';
            }
        }

        field.value = formatedValue;

        let validations = validateField(fieldName, field);

        field.valid = validations.valid;
        field.errors = validations.errors;

        setForm({ ...form, [fieldName]: field });
    }

    const validateForm = useCallback(() => {
        let isValid = true;
        // Access the value property of the ref
        let updatedForm = { ...form };

        for (let key in updatedForm) {
            if (Object.prototype.hasOwnProperty.call(updatedForm, key)) {
                let field = updatedForm[key as keyof FormType];
                let validations = validateField(key, field);
                field.valid = validations.valid;
                field.errors = validations.errors;

                if (!field.valid) {
                    isValid = false;
                }
            }
        }

        setForm(updatedForm);
        return isValid;
    }, []);

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const resetForm = () => {
        form.rut.value = '';
        form.rut.errors = [];
        form.nombres.value = '';
        form.nombres.errors = [];
        form.apellidos.value = '';
        form.apellidos.errors = [];
        form.fechaNacimiento.value = '';
        form.fechaNacimiento.errors = [];
        form.edad.value = 0;
        form.edad.errors = [];
        form.sexo.value = '';
        form.sexo.errors = [];
        form.saldo.value = 0;
        form.saldo.errors = [];

        validateForm();
    }

    const processForm = (e: any) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        let isValid = validateForm();

        console.log('Form validation result:', isValid, form);

        if (isValid) {
            let user = {
                rut: form.rut.value as string,
                nombres: form.nombres.value as string,
                apellidos: form.apellidos.value as string,
                fechaNacimiento: form.fechaNacimiento.value as string,
                edad: form.edad.value as number,
                sexo: form.sexo.value as string,
                saldo: form.saldo.value as number
            };

            onUserAdded(user); // Notifica al padre que hay un nuevo usuario
            resetForm(); // Resetea el formulario
        }
    }

    return (
        <div>
            <h3 className="text-white">Add User</h3>
            <form onSubmit={processForm}>
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label text-white">RUT</label>
                    <input
                        type="text"
                        className={"form-control" + (form.rut.valid ? '' : ' is-invalid')}
                        id="rut"
                        minLength={form.rut.minLength}
                        maxLength={form.rut.maxLength}
                        value={form.rut.value}
                        required={form.rut.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.rut.errors && form.rut.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label text-white">Nombres</label>
                    <input
                        type="text"
                        className={"form-control" + (form.nombres.valid ? '' : ' is-invalid')}
                        id="nombres"
                        minLength={form.nombres.minLength}
                        maxLength={form.nombres.maxLength}
                        value={form.nombres.value}
                        required={form.nombres.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.nombres.errors && form.nombres.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label text-white">Apellidos</label>
                    <input
                        type="text"
                        className={"form-control" + (form.apellidos.valid ? '' : ' is-invalid')}
                        id="apellidos"
                        minLength={form.apellidos.minLength}
                        maxLength={form.apellidos.maxLength}
                        value={form.apellidos.value}
                        required={form.apellidos.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.apellidos.errors && form.apellidos.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label text-white">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className={"form-control" + (form.fechaNacimiento.valid ? '' : ' is-invalid')}
                        id="fechaNacimiento"
                        min="1900-01-01"
                        value={form.fechaNacimiento.value}
                        required={form.fechaNacimiento.required}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.fechaNacimiento.errors && form.fechaNacimiento.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label text-white">Edad</label>
                    <input
                        type="number"
                        className={"form-control" + (form.edad.valid ? '' : ' is-invalid')}
                        id="edad"
                        required={form.edad.required}
                        min={form.edad.min}
                        max={form.edad.max}
                        value={form.edad.value}
                        readOnly
                    />
                    <span className="text-danger">
                        {form.edad.errors && form.edad.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Sexo</label>
                    <br />
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoM"
                        required={form.sexo.required && form.sexo.value === ''}
                        value={form.sexo.value}
                        checked={form.sexo.value === 'M'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1 me-2" htmlFor="sexoM">Masculino</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sexoF"
                        required={form.sexo.required && form.sexo.value === ''}
                        value={form.sexo.value}
                        checked={form.sexo.value === 'F'}
                        onChange={handleValueChange}
                    />
                    <label className="form-check-label text-white ms-1" htmlFor="sexoF">Femenino</label>
                    <span className="text-danger">
                        {form.sexo.errors && form.sexo.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <div className="mb-3">
                    <label htmlFor="saldo" className="form-label text-white">Saldo</label>
                    <input
                        type="number"
                        className={"form-control" + (form.saldo.valid ? '' : ' is-invalid')}
                        id="saldo"
                        required={form.saldo.required}
                        min={form.saldo.min}
                        max={form.saldo.max}
                        value={form.saldo.value}
                        onChange={handleValueChange}
                    />
                    <span className="text-danger">
                        {form.saldo.errors && form.saldo.errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </span>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}