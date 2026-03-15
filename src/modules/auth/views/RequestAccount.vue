<template>
  <div class="request-page">
    <h2 class="title">Request Account</h2>
    <p class="subtitle">Fill in your details to request an account from the Director.</p>

    <form class="request-form">
      <input type="text" placeholder="Full Name" class="form-input" />
      <input type="email" placeholder="Email Address" class="form-input" />
      <textarea placeholder="Reason for request" class="form-input textarea"></textarea>

      <button type="submit" class="btn-submit">Send Request</button>
    </form>
  </div>
</template>

<style scoped>
/* Page Layout */
.request-page {
  min-height: 100vh;
  background: #f9fafb; /* light background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Title & Subtitle */
.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #1a202c; /* dark gray */
  margin-bottom: 0.5rem;
}
.subtitle {
  color: #4a5568; /* medium gray */
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Form Styling */
.request-form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Inputs */
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e0; /* light gray border */
  border-radius: 8px;
  font-size: 0.95rem;
  color: #2d3748; /* dark text */
  transition: border 0.2s ease;
}
.form-input:focus {
  outline: none;
  border-color: #16a34a; /* green focus */
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
}
.textarea {
  min-height: 100px;
  resize: vertical;
}

/* Submit Button */
.btn-submit {
  background: #16a34a; /* green */
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.btn-submit:hover {
  background: #15803d; /* darker green */
}
</style>
