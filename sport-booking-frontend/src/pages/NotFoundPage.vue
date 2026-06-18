<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
    <Card class="w-full max-w-md text-center">
      <template #title>404</template>

      <template #content>
        <p class="text-slate-500">ไม่พบหน้าที่ต้องการ</p>

        <RouterLink to="/">
          <Button label="กลับหน้าแรก" icon="pi pi-home" class="mt-5" />
        </RouterLink>
      </template>
    </Card>
  </div>
</template>