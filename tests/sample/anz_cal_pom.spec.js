import { test, expect } from '@playwright/test';
import {testCa} from '../../pages/testCa';

test('test', async ({ page }) => {

  const Cal = new testCa(page)

  await Cal.goto()
  await Cal.ANZCalculator('8,0000', '1,0000', '500', '100', '1,0000')
  await Cal.actualValue()
  expect(actualValue).toEqual(expectedValue)

});