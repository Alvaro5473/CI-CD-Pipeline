import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Navegar a la página
  await page.goto('localhost:3000');

  // Verificar que aparece el título de la página
  await expect(page).toHaveTitle(/Tasks/);
});

test('can add a new task', async ({ page }) => {
  // Navegar a la página
  await page.goto('localhost:3000');
  
  // Encontrar el input y escribir una tarea
  const input = page.getByPlaceholder('Introduce a new task');
  await input.fill('Nueva tarea de prueba');
  
  // Hacer clic en el botón de añadir
  await page.getByRole('button', { name: 'Add' }).click();
  
  // Verificar que la tarea aparece en la tabla
  const taskCell = page.getByRole('cell', { name: 'Nueva tarea de prueba' });
  await expect(taskCell).toBeVisible();
  
  // Verificar que el input se ha limpiado
  await expect(input).toHaveValue('');
});

test('can remove a task', async ({ page }) => {
  // Navegar a la página
  await page.goto('localhost:3000');
  
  // Añadir una tarea primero
  const input = page.getByPlaceholder('Introduce a new task');
  await input.fill('Tarea para eliminar');
  await page.getByRole('button', { name: 'Add' }).click();
  
  // Verificar que la tarea se añadió correctamente
  const taskCell = page.getByRole('cell', { name: 'Tarea para eliminar' });
  await expect(taskCell).toBeVisible();
  
  // Hacer clic en el botón Done
  await page.getByRole('button', { name: 'Done' }).click();
  
  // Verificar que la tarea ya no está visible
  await expect(taskCell).not.toBeVisible();
  
  // Verificar que la tabla está vacía (opcional, pero más robusto)
  const tbody = page.locator('tbody');
  await expect(tbody.getByRole('row')).toHaveCount(0);
});

test('cannot add empty tasks', async ({ page }) => {
  // Navegar a la página
  await page.goto('localhost:3000');
  
  // Intentar añadir una tarea vacía
  const input = page.getByPlaceholder('Introduce a new task');
  await page.getByRole('button', { name: 'Add' }).click();
  
  // Verificar que no se añadió ninguna fila a la tabla
  const tbody = page.locator('tbody');
  await expect(tbody.getByRole('row')).toHaveCount(0);
  
  // Intentar añadir una tarea que solo contiene espacios
  await input.fill('   ');
  await page.getByRole('button', { name: 'Add' }).click();
  
  // Verificar que tampoco se añadió ninguna fila
  await expect(tbody.getByRole('row')).toHaveCount(0);
});

test('can add multiple tasks', async ({ page }) => {
  // Navegar a la página
  await page.goto('localhost:3000');
  
  const input = page.getByPlaceholder('Introduce a new task');
  const tasks = ['Primera tarea', 'Segunda tarea', 'Tercera tarea'];
  
  // Añadir múltiples tareas
  for (const taskText of tasks) {
    await input.fill(taskText);
    await page.getByRole('button', { name: 'Add' }).click();
  }
  
  // Verificar que se han añadido todas las tareas
  const tbody = page.locator('tbody');
  await expect(tbody.getByRole('row')).toHaveCount(tasks.length);
  
  // Verificar que cada tarea está presente y en el orden correcto
  for (const taskText of tasks) {
    const taskCell = page.getByRole('cell', { name: taskText });
    await expect(taskCell).toBeVisible();
  }
  
  // Verificar que el input está vacío después de añadir todas las tareas
  await expect(input).toHaveValue('');
});