import { inject, observer } from "mobx-react";
import React from "react";
import DocumentTitle from "react-document-title";

import { Box, Button, Col, Grid, Row, Text } from "../../components";
import RootStore from "../../store";

interface Props {
    rootStore: RootStore;
}

class NoMatchClass extends React.Component<Props> {
    public render() {
        const {
            rootStore: { isAuthenticated }
        } = this.props;
        return (
            <DocumentTitle title="Not Found | Wilbur">
                <Grid maxWidth="md" ph={{ xs: 2, md: 10 }}>
                    <Row>
                        <Col xs={12}>
                            <Box mt={isAuthenticated ? 12 : 16}>
                                <Box
                                    alignItems={Box.AlignItems.Center}
                                    css={`
                                        height: 2.3125rem;
                                    `}
                                    display={Box.Display.Flex}
                                    justifyContent={Box.JustifyContent.Center}
                                    mb={1}
                                >
                                    <Text
                                        el={Text.Element.H1}
                                        font={Text.Font.Title}
                                        noMargin={true}
                                        size={Text.Size.Xxl}
                                    >
                                        Something is amiss
                                    </Text>
                                </Box>
                                <Box mb={8} textAlign={Box.TextAlign.Center}>
                                    <Text>
                                        Apologies, but there&#8217;s nothing
                                        here at the moment.
                                    </Text>
                                </Box>
                                <Box
                                    display={Box.Display.Flex}
                                    justifyContent={Box.JustifyContent.Center}
                                >
                                    <Button color={Button.Color.Brand} to="/">
                                        Back to Home
                                    </Button>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Grid>
            </DocumentTitle>
        );
    }
}

export const NoMatch = inject("rootStore")(observer(NoMatchClass));
