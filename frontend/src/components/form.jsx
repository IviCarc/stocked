import { useEffect, useMemo, useState, useDispatch, useSelector } from "react";

export const useForm = (initialform = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialform);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialform);
    }, [initialform]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) {
                return false;
            }
        }
        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { value, name } = target;
        setFormState({
            ...formState,
            [name]: value
        })
        console.log(formState)
    }

    const onResetForm = () => {
        setFormState(initialform)
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Error de validación'] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {
        formState, onInputChange, onResetForm, ...formState, ...formValidation, isFormValid
    }
}


const formData = {
    displayName: '',
    email: '',
    password: ''
}

// Usar regex

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
    password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;
    }
}