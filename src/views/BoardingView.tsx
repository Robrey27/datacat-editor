import React, { useState, lazy, Suspense } from "react";
import { Paper, Typography, Tabs, Tab, Stack, Box } from "@mui/material";
import useAuthContext from "../hooks/useAuthContext";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import { T } from "@tolgee/react";

// Lazy load heavy components
const LoginForm = lazy(() => import("../components/LoginForm"));
const SignupForm = lazy(() => import("../components/SignupForm"));
const IntroPanel = lazy(() => import("../components/IntroPanel"));
const LanguageSwitcher = lazy(() => import("../components/LanguageSwitcher"));

// Replace makeStyles with styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const LanguageSwitcherBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function BoardingView() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();
  const [signupSent, setSignupSent] = useState(false);
  const [tab, setTab] = useState("login");

  const handleLogin = (token: string) => {
    enqueueSnackbar(<T keyName="boarding.login_success">Willkommen zurück!</T>);
    login(token);
  };

  const handleSignup = () => {
    setSignupSent(true);
    enqueueSnackbar(
      <T keyName="boarding.signup_success">
        Sie erhalten in den nächsten Minuten einen Bestätigungscode per Email,
        mit dem Sie Ihren Account aktivieren können.
      </T>
    );
  };

  return (
    <div style={{ color: "black" }}>
      <Stack spacing={3}>
        {/* Header mit Title und Sprachauswahl */}
        <Box>
          <StyledPaper variant="outlined">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">
                <PetsIcon />{" "}
                <T keyName="boarding.welcome">Willkommen beim datacat editor</T>
              </Typography>
              <LanguageSwitcherBox>
                <Suspense fallback={null}>
                  <LanguageSwitcher
                    textColor="black"
                    dropdownColor="black"
                    borderColor="black"
                  />
                </Suspense>
              </LanguageSwitcherBox>
            </Stack>
          </StyledPaper>
        </Box>

        {/* 2-spaltige Ansicht für Intro und Anmeldung */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="stretch"
        >
          {/* Linke Spalte - IntroPanel */}
          <Box sx={{ flex: 7 }}>
            <Suspense fallback={null}>
              <IntroPanel />
            </Suspense>
          </Box>

          {/* Rechte Spalte - Login/Signup */}
          <Box sx={{ flex: 4 }}>
            <Paper sx={{ height: "100%" }}>
              <Tabs
                value={tab}
                onChange={(event, value) => setTab(value)}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab
                  label={<T keyName="boarding.login_tab">Anmelden</T>}
                  value="login"
                />
                <Tab
                  label={<T keyName="boarding.signup_tab">Registrieren</T>}
                  value="signup"
                />
              </Tabs>
              <TabPanel value={tab} index="login">
                <Typography sx={{ marginBottom: 2 }}>
                  <T keyName="boarding.login_message">
                    Bitte nutzen Sie Ihren Benutzernamen und Ihr Password um
                    sich beim Editor anzumelden.
                  </T>
                </Typography>
                <Suspense fallback={null}>
                  <LoginForm onLogin={handleLogin} />
                </Suspense>
              </TabPanel>

              <TabPanel value={tab} index="signup">
                {signupSent ? (
                  <Typography>
                    <T keyName="boarding.signup_success">
                      Sie erhalten in den nächsten Minuten einen
                      Bestätigungscode per Email, mit dem Sie Ihren Account
                      aktivieren können.
                    </T>
                  </Typography>
                ) : (
                  <React.Fragment>
                    <Typography sx={{ marginBottom: 2 }}>
                      <T keyName="boarding.signup_message">
                        Sie können sich registrieren um lesenden Zugriff auf den
                        Katalog zu erhalten. Möchten Sie sich an der Bearbeitung
                        des Katalogs beteiligen, so informieren Sie bitte den
                        Administrator.
                      </T>
                    </Typography>
                    <Suspense fallback={null}>
                      <SignupForm onSignup={handleSignup} />
                    </Suspense>
                  </React.Fragment>
                )}
              </TabPanel>
            </Paper>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
