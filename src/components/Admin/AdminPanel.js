import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f5f6fa 100%);
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(44, 62, 80, 0.10);
  padding: 2.5rem 2rem;
`;

const Title = styled.h2`
  text-align: center;
  color: #2563eb;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  letter-spacing: 1px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fafbfc;
  font-size: 1.05rem;
`;

const Th = styled.th`
  background: #2563eb;
  color: #fff;
  padding: 1rem 0.5rem;
  font-weight: 700;
  border-bottom: 2px solid #eaeaea;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.9rem 0.5rem;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
`;

const Tr = styled.tr`
  transition: background 0.2s;
  &:hover {
    background: #f1f5fd;
  }
`;

const Select = styled.select`
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #f5f6fa;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #2563eb;
  }
`;

const ErrorMsg = styled.div`
  color: #dc3545;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      setUsers(users.map(u => u.id === id ? { ...u, role: data.user.role } : u));
    } catch (err) {
      setError('Erreur lors du changement de rôle');
    }
  };

  return (
    <PageBackground>
      <Container>
        <Title>Gestion des utilisateurs</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Nom</Th>
                <Th>Email</Th>
                <Th>Rôle</Th>
                <Th>Wallet</Th>
                <Th>Actif</Th>
                <Th>Changer le rôle</Th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <Tr key={u.id}>
                  <Td>{u.username}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.role}</Td>
                  <Td>{u.walletAddress || '-'}</Td>
                  <Td>{u.isActive ? 'Oui' : 'Non'}</Td>
                  <Td>
                    <Select
                      value={u.role}
                      onChange={e => handleRoleChange(u.id, e.target.value)}
                      disabled={u.id === user.id}
                    >
                      <option value="NONE">NONE</option>
                      <option value="OFFICE_AGENT">OFFICE_AGENT</option>
                      <option value="VERIFIER">VERIFIER</option>
                      <option value="ADMIN">ADMIN</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </Container>
    </PageBackground>
  );
};

export default AdminPanel;
