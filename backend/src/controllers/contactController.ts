import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ContactModel from '../models/contactModel';
import { ContactData, Contact, ApiResponse, PaginationResponse } from '../types';

class ContactController {
  static async createContact(req: Request<{}, {}, ContactData>, res: Response<ApiResponse<Contact>>): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
        return;
      }

      const { name, email, subject, message } = req.body;
      
      const newContact = await ContactModel.create({
        name,
        email,
        subject,
        message
      });

      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: newContact
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form',
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      });
    }
  }

  static async getContacts(req: Request, res: Response<ApiResponse<Contact[]> & { pagination?: PaginationResponse }>): Promise<void> {
    try {
      const { limit = '50', offset = '0' } = req.query as { limit?: string; offset?: string };
      
      const limitNum = parseInt(limit, 10);
      const offsetNum = parseInt(offset, 10);
      
      const contacts = await ContactModel.findAll(limitNum, offsetNum);
      const total = await ContactModel.count();

      res.json({
        success: true,
        data: contacts,
        pagination: {
          total,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + contacts.length < total
        }
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contacts',
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      });
    }
  }

  static async getContactById(req: Request<{ id: string }>, res: Response<ApiResponse<Contact>>): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const contact = await ContactModel.findById(id);

      if (!contact) {
        res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
        return;
      }

      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact',
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      });
    }
  }

  static async updateContactStatus(req: Request<{ id: string }, {}, { status: Contact['status'] }>, res: Response<ApiResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;

      if (!status || !['pending', 'read', 'responded', 'archived'].includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
        return;
      }

      const updated = await ContactModel.updateStatus(id, status);

      if (!updated) {
        res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Contact status updated successfully'
      });
    } catch (error) {
      console.error('Error updating contact status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update contact status',
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      });
    }
  }

  static async deleteContact(req: Request<{ id: string }>, res: Response<ApiResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await ContactModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Contact deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete contact',
        error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      });
    }
  }
}

export default ContactController;