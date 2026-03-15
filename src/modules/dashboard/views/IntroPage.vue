<template>
  <div class="intro-page">
    <!-- Header -->
    <div class="intro-header">
      <h1>Welcome to Karibu Groceries Management System</h1>
      <p>
        A premium business management system designed to simplify operations,
        track finances, and provide real-time insights.
      </p>
    </div>

    <!-- Cards Section -->
    <div class="intro-cards">
      <div class="card">
        <div class="icon">📊</div>
        <h3>Dashboard Overview</h3>
        <p>Navigate using the sidebar to access Sales, Produce, Credits, and Reports.</p>
      </div>

      <div class="card">
        <div class="icon">➕</div>
        <h3>Adding Records</h3>
        <p>Click “+ Add” to open forms. ✅ Valid inputs show a green check, ❌ errors are highlighted.</p>
      </div>

      <div class="card">
        <div class="icon">✏️</div>
        <h3>Editing & Deleting</h3>
        <p>Update existing records or delete them permanently with confirmation.</p>
      </div>

      <div class="card">
        <div class="icon">📈</div>
        <h3>Reports & Analytics</h3>
        <p>Compact charts visualize performance. Credit risk is displayed with clear ratios.</p>
      </div>

      <div class="card">
        <div class="icon">🔔</div>
        <h3>Feedback</h3>
        <p>Toast notifications confirm every action so you always know what happened.</p>
      </div>

      <div class="card">
        <div class="icon">🚀</div>
        <h3>Getting Started</h3>
        <p>Log in, explore modules, add your first record, and review analytics in real time.</p>
      </div>
    </div>

    <!-- Buttons Section -->
    <div class="intro-buttons">
      <router-link to="/login" class="btn btn-login">Go to Login</router-link>
      <router-link to="/request-account" class="btn btn-request">Request Account</router-link>
    </div>
  </div>
</template>

<style scoped>
/* Page Layout */
.intro-page {
  min-height: 100vh;
  background: #a1d3df;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Header */
.intro-header {
  text-align: center;
  margin-bottom: 2.5rem;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #01596D;
}
.intro-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #01596D;
}
.intro-header p {
  margin-top: 0.5rem;
  color: #01596D; /* medium gray */
  max-width: 600px;
}

/* Cards Grid */
.intro-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1000px;
  margin-bottom: 2.5rem;
  background-color: #a1d3df;
}
@media (min-width: 768px) {
  .intro-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .intro-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Card Styling */
.card {
  background-image: linear-gradient(to bottom, #cedce0, #ffffff);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
.card .icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
.card h3 {
  font-weight: 600;
  color: #2d3748; /* dark gray */
}
.card p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #718096; /* lighter gray */
}

/* Buttons Section */
.intro-buttons {
  display: flex;
  gap: 1rem;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.btn-login {
  background: #2563eb; /* blue */
  color: #fff;
}
.btn-login:hover {
  background: #1e40af; /* darker blue */
}
.btn-request {
  background: #16a34a; /* green */
  color: #fff;
}
.btn-request:hover {
  background: #15803d; /* darker green */
}
</style>
