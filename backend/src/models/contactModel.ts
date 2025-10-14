import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { getPool } from '../config/database';
import { Contact, ContactData } from '../types';

interface ContactRow extends RowDataPacket, Contact {}

class ContactModel {
  static async create(contactData: ContactData): Promise<Contact> {
    const pool = getPool();
    const { name, email, subject, message } = contactData;
    
    const query = `
      INSERT INTO contacts (name, email, subject, message, created_at) 
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    try {
      const [result] = await pool.execute<ResultSetHeader>(query, [name, email, subject, message]);
      return {
        id: result.insertId,
        ...contactData,
        created_at: new Date()
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to create contact: ${errorMessage}`);
    }
  }

  static async findAll(limit: number = 50, offset: number = 0): Promise<Contact[]> {
    const pool = getPool();
    const query = `
      SELECT id, name, email, subject, message, created_at, status 
      FROM contacts 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    try {
      const [rows] = await pool.execute<ContactRow[]>(query, [limit.toString(), offset.toString()]);
      return rows;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch contacts: ${errorMessage}`);
    }
  }

  static async findById(id: number): Promise<Contact | null> {
    const pool = getPool();
    const query = `
      SELECT id, name, email, subject, message, created_at, status 
      FROM contacts 
      WHERE id = ?
    `;
    
    try {
      const [rows] = await pool.execute<ContactRow[]>(query, [id.toString()]);
      return rows[0] || null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch contact: ${errorMessage}`);
    }
  }

  static async updateStatus(id: number, status: Contact['status']): Promise<boolean> {
    const pool = getPool();
    const query = `
      UPDATE contacts 
      SET status = ?, updated_at = NOW() 
      WHERE id = ?
    `;
    
    try {
      const [result] = await pool.execute<ResultSetHeader>(query, [status, id.toString()]);
      return result.affectedRows > 0;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update contact status: ${errorMessage}`);
    }
  }

  static async delete(id: number): Promise<boolean> {
    const pool = getPool();
    const query = 'DELETE FROM contacts WHERE id = ?';
    
    try {
      const [result] = await pool.execute<ResultSetHeader>(query, [id.toString()]);
      return result.affectedRows > 0;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete contact: ${errorMessage}`);
    }
  }

  static async count(): Promise<number> {
    const pool = getPool();
    const query = 'SELECT COUNT(*) as total FROM contacts';
    
    try {
      const [rows] = await pool.execute<(RowDataPacket & { total: number })[]>(query);
      return rows[0]?.total || 0;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to count contacts: ${errorMessage}`);
    }
  }
}

export default ContactModel;