import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useGridStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    paragraph: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1.5)
    },
    form: {
        "& > *": {
            marginBottom: theme.spacing(1.5)
        }
    }
}));

export default useGridStyles;
