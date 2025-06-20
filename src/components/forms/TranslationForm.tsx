import React, {useState, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {defaultFormFieldOptions} from "../../hooks/useFormStyles";
import { styled } from "@mui/material/styles";
import InlineButtonGroup from "./InlineButtonGroup";
import {ClickAwayListener} from "@mui/material";
import {TranslationPropsFragment} from "../../generated/types";

// Verbesserte Formular-Container-Styles
const FormContainer = styled('form')({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    alignItems: "flex-start", // Ausrichtung am Anfang, besser für mehrzeilige Textfelder
    gap: "8px", // Abstand zwischen Textfeld und Button
});

// Verbesserte TextField-Styles
const StyledTextField = styled(TextField)({
    flexGrow: 1,
    flexBasis: 0, // Wichtig für gleichmäßige Expansion
    minWidth: "60%", // Minimale Breite für das Textfeld
});

// Verbesserte Button-Container-Styles
const ButtonContainer = styled('div')({
    flexShrink: 0, // Verhindert, dass Buttons zusammengedrückt werden
    display: "flex",
    alignItems: "flex-start", // Ausrichtung am Anfang
    paddingTop: "8px", // Ein bisschen Platz zum Textfeld-Label
});

export type TranslationFormValues = {
    value: string;
};

export type TranslationFormProps = {
    translation: TranslationPropsFragment;
    onSubmit(values: TranslationFormValues): void;
    onDelete?(): void;
    TextFieldProps?: Partial<Omit<TextFieldProps, "name" | "onFocus">>;
};

const TranslationForm = (props: TranslationFormProps) => {
    const {
        translation,
        onSubmit,
        onDelete,
        TextFieldProps
    } = props;
    const defaultValues = {
        ...translation
    }
    const [isEditMode, setIsEditMode] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        formState
    } = useForm<TranslationFormValues>({
        mode: "onChange",
        defaultValues
    });

    const [submittedData, setSubmittedData] = useState<TranslationFormValues>({...defaultValues});

    const onEdit = () => {
        setIsEditMode(true);
    };

    const onReset = () => {
        setIsEditMode(false);
        reset()
    };

    const onSave = async (values: TranslationFormValues) => {
        setSubmittedData(values);
        await onSubmit(values);
        setIsEditMode(false);
        reset();
    };

    const onClickAway = () => {
        if (!formState.isDirty) {
            setIsEditMode(false);
            reset();
        }
    };

    const textFieldProps = {
        id: `${translation.id}-value`,
        label: `${translation.language.displayLanguage} / ${translation.language.displayCountry}`,
        required: true,
        InputProps: {
            lang: translation.language.languageTag,
            readOnly: !isEditMode,
            onFocus: !isEditMode ? onEdit : undefined
        }
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({...submittedData});
        }
    }, [formState.isSubmitSuccessful, submittedData, reset]);

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <FormContainer onSubmit={handleSubmit(onSave)}>
                <Controller
                    name="value"
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => (
                        <StyledTextField
                            {...field}
                            {...defaultFormFieldOptions}
                            {...TextFieldProps}
                            {...textFieldProps}
                            error={!!errors.value}
                            InputProps={{
                                ...textFieldProps.InputProps,
                                endAdornment: !isEditMode ? (
                                    <Button
                                        size="small"
                                        onClick={onEdit}
                                        sx={{ ml: 1 }}
                                    >
                                        Bearbeiten
                                    </Button>
                                ) : undefined
                            }}
                        />
                    )}
                />
                {isEditMode && (
                    <ButtonContainer>
                        <InlineButtonGroup
                            formState={formState}
                            onReset={onReset}
                            onDelete={onDelete}
                        />
                    </ButtonContainer>
                )}
            </FormContainer>
        </ClickAwayListener>
    );
}

export default TranslationForm;
