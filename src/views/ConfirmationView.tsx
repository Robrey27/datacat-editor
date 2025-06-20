import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ConfirmEmailMutationVariables, useConfirmEmailMutation } from "../generated/types";
import TextField from "@mui/material/TextField";
import { Button, Alert, Grid, Paper } from "@mui/material";
import useLocationQueryParam from "../hooks/useLocationQueryParam";
import { Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const ParagraphTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

const StyledForm = styled('form')(({ theme }) => ({
    "& > *": {
        marginBottom: theme.spacing(1.5),
    },
}));

export default function ConfirmationView() {
    const token = useLocationQueryParam('token', '');
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ConfirmEmailMutationVariables>();
    const [success, setSuccess] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [confirm, { error }] = useConfirmEmailMutation({
        errorPolicy: "all",
        onCompleted: (result) => {
            if (result.success) {
                enqueueSnackbar('Ihre Email-Adresse wurde bestätigt. Bitte nutzen Sie Ihren gewählten Benutzernamen und Ihr Password um sich anzumelden.');
                setSuccess(true);
            }
        }
    });
    const onSubmit = async (value: ConfirmEmailMutationVariables) => {
        await confirm({ variables: value });
    }

    useEffect(() => {
        setValue("token", token);
    }, [token, setValue]);

    if (success) {
        return <Navigate to="/" />;
    }

    return (
        <Grid container spacing={3}>
            <Grid>
                <StyledPaper variant="outlined">
                    <Typography variant="h4">
                        Bestätigen Sie Ihre Email-Adresse
                    </Typography>
                </StyledPaper>
            </Grid>
            <Grid>
                <StyledPaper>
                    <ParagraphTypography>
                        Danke für Ihr Interesse am datacat editor. Bitte geben Sie im folgenden Formular den Bestätigungscode an, den Sie per Email erhalten haben.
                        Anschließend können Sie auf Ihren Account zugreifen und erhalten Leserechte für den Datenkatalog.
                    </ParagraphTypography>
                    <ParagraphTypography>
                        Möchten Sie auch schreibenden Zugriff auf den Datenkatalog erhalten, informieren Sie bitte den Administrator der Anwendung über die unten genannten Kontaktdaten.
                    </ParagraphTypography>
                </StyledPaper>
            </Grid>
            <Grid>
                <StyledPaper>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                        {error && <Alert severity="error">{error.message}</Alert>}

                        <TextField
                            {...register("token", { required: true })}
                            label="Bestätigungstoken"
                            required
                            error={!!errors.token}
                            helperText={errors.token ? 'Der Bestätigungstoken ist notwendig um Ihre Email-Adresse zu bestätigen und wird Ihrem Postfach zugestellt.' : ''}
                            fullWidth
                        />
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Absenden
                        </Button>
                    </StyledForm>
                </StyledPaper>
            </Grid>
        </Grid>
    )
}
