import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { Contact } from '@prisma/client';
import { adminProtectedPage } from '@/lib/page-protection';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { authOptions } from '../api/auth/[...nextauth]/route';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const contacts: Contact[] = await prisma.contact.findMany({});
  const notes = await prisma.note.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">List Contacts (Admin)</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={contact.firstName}>
                  <ContactCardAdmin contact={contact} notes={notes.filter(note => (note.contactId === contact.id))} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
