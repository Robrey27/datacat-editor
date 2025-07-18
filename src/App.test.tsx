import React from 'react';
import { test, expect } from 'vitest';

test('vars are available during testing', () => {
    expect(process.env.REACT_APP_VERSION).not.toBeFalsy();
});
