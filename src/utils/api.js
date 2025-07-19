import { supabase } from './supabase';

export async function loginUser(email, password) {
  const response = await fetch('http://localhost:5000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function registerUser(email, password, username) {
  const response = await fetch('http://localhost:5000/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });
  return response.json();
}

export async function logOutUser() {
  const response = await fetch('http://localhost:5000/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') }),
  });
  localStorage.removeItem('token');

  await supabase.auth.signOut({ scope: 'local' });
  return response.json();
}

export async function getTransactions(token) {
  const response = await fetch('http://localhost:5000/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function addTransaction(data, token) {
  const response = await fetch('http://localhost:5000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTransaction(id, token) {
  const response = await fetch(`http://localhost:5000/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function updateTransaction(id, data, token) {
  const response = await fetch(`http://localhost:5000/transactions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}


