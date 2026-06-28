import { describe, it, expect } from 'vitest';
import { getAvailableScopeNames, hasScope, scopeNameToUrl } from './scopes.js';
import { getToolByName } from './tools.js';

describe('permanent delete scope requirements', () => {
  it('recognizes gmail.full as the permanent-delete Gmail scope', () => {
    expect(getAvailableScopeNames()).toContain('gmail.full');
    expect(scopeNameToUrl('gmail.full')).toBe('https://mail.google.com/');
  });

  it('does not expose permanent delete tools with only gmail.modify', () => {
    const deleteEmail = getToolByName('delete_email')!;
    const batchDeleteEmails = getToolByName('batch_delete_emails')!;

    expect(deleteEmail.scopes).toEqual(['gmail.full']);
    expect(batchDeleteEmails.scopes).toEqual(['gmail.full']);
    expect(hasScope(['gmail.modify'], deleteEmail.scopes)).toBe(false);
    expect(hasScope(['gmail.modify'], batchDeleteEmails.scopes)).toBe(false);
  });

  it('exposes permanent delete tools with gmail.full shorthand or URL scope', () => {
    const deleteEmail = getToolByName('delete_email')!;
    const batchDeleteEmails = getToolByName('batch_delete_emails')!;

    expect(hasScope(['gmail.full'], deleteEmail.scopes)).toBe(true);
    expect(hasScope(['https://mail.google.com/'], batchDeleteEmails.scopes)).toBe(true);
  });
});
