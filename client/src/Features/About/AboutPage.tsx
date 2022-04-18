import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import Agent from "../../App/API/Agent";

const errors = Agent.TestErrors
const handle = (errorPromise: Promise<any>) => errorPromise.catch(error => console.log(error))

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    function showValidationErrors() {
        errors.getValidationError()
        .then(() => alert("You shouldn't see this alert"))
        .catch(errors => setValidationErrors(errors))
    }
    
    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Testing errors
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => handle(errors.get400Error())}>
                    Get 400 Error
                </Button>
                <Button variant="contained" onClick={() => handle(errors.get401Error())}>
                    Get 401 Error
                </Button>
                <Button variant="contained" onClick={() => handle(errors.get404Error())}>
                    Get 404 Error
                </Button>
                <Button variant="contained" onClick={() => handle(errors.get500Error())}>
                    Get 500 Error
                </Button>
                <Button variant="contained" onClick={showValidationErrors}>
                    Get Validation Error
                </Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle> Validation errors </AlertTitle>
                    <List>
                        {validationErrors.map((error) => (
                            <ListItem key={error}>
                                {error}
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}