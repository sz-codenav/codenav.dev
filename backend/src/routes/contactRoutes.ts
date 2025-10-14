import { Router } from 'express';
import ContactController from '../controllers/contactController';
import {
  contactValidationRules,
  paginationValidationRules,
  idValidationRules,
  statusValidationRules
} from '../middleware/validation';

const router: Router = Router();

router.post(
  '/',
  contactValidationRules(),
  ContactController.createContact
);

router.get(
  '/',
  paginationValidationRules(),
  ContactController.getContacts
);

router.get(
  '/:id',
  idValidationRules(),
  ContactController.getContactById
);

router.patch(
  '/:id/status',
  idValidationRules(),
  statusValidationRules(),
  ContactController.updateContactStatus
);

router.delete(
  '/:id',
  idValidationRules(),
  ContactController.deleteContact
);

export default router;