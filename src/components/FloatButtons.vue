<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center position-fixed bottom-0 end-0 p-5"
    style="z-index: 1000;"
  >
    <div
      class="btn-group-vertical"
      role="group"
      aria-label="Basic example"
    >
      <button
        type="button"
        class="whatsapp-button"
      >
        <img
          src="/whatsapp-icon.png"
          alt="whatsapp"
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.whatsapp-button {
    border-radius: 50%;
    padding: 0;
    width: 80px;
    height: 80px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
}

.whatsapp-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.whatsapp-button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>