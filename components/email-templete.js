import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';
export const EmailTemplate= ({
  response,
}) => (
<>  
<Html>
      <Head />
      <Preview>File shared with you</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img width={100} height={50} src={'https://firebasestorage.googleapis.com/v0/b/portfolio-builds.appspot.com/o/file-upload%2FAutomated%20tracking%20system%20blue%20icon.jpg?alt=media&token=1094dc3c-219d-4cf3-a13c-853fc3e9de48'} />
          </Section>

          <Section style={content}>
            <Img width={620} src={'https://firebasestorage.googleapis.com/v0/b/portfolio-builds.appspot.com/o/file-upload%2FAutomated%20tracking%20system%20blue%20icon.jpg?alt=media&token=1094dc3c-219d-4cf3-a13c-853fc3e9de48'} />

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Hi {response.emailToSend?.split("@")[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  A file was shared with you
                </Heading>

                <Text style={paragraph}>
                  <b>File Name: </b>
                  {response.fileName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Size: </b>
                  {response.fileSize}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Type: </b>
                  {response.fileType}
                </Text>
              </Column>
            </Row>

            <Row style={{ ...boxInfos, paddingTop: '0' }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button} href={response?.shortUrl}>Click here to Download</Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img width={620} src={'https://firebasestorage.googleapis.com/v0/b/portfolio-builds.appspot.com/o/file-upload%2FAutomated%20tracking%20system%20blue%20icon.jpg?alt=media&token=1094dc3c-219d-4cf3-a13c-853fc3e9de48'} />
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © 2024 | Elevate Solutions Inc @2024 Copyrights.  Addis Abeba ,Kolfe, Atena Tera
            Ethiopia. | www.Elevate Solutions.com
          </Text>
        </Container>
      </Body>
    </Html>
    </>
);

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const button = {
  backgroundColor: 'blue',
  padding: '12px 30px',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
};
const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const boxInfos = {
  padding: '20px 40px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};
