import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import Agent from "../../App/API/Agent";

const errors = Agent.TestErrors
const handle = (errorPromise: Promise<any>) => errorPromise.catch(error => console.log(error))

export default function AboutPage() {
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
                <Button variant="contained" onClick={() => handle(errors.getValidationError())}>
                    Get Validation Error
                </Button>
            </ButtonGroup>
        </Container>
    )
}