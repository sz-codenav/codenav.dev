<template>
  <div id="app">
    <header class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-code">Code</span><span class="logo-nav">Nav</span>
        </router-link>
        <nav class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/products">Products</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/tech-stack">Tech Stack</router-link>
          <router-link to="/contact" class="contact-btn">Contact</router-link>
        </nav>
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav class="mobile-nav" v-if="mobileMenuOpen">
        <router-link to="/" @click="closeMobileMenu">Home</router-link>
        <router-link to="/products" @click="closeMobileMenu">Products</router-link>
        <router-link to="/about" @click="closeMobileMenu">About</router-link>
        <router-link to="/tech-stack" @click="closeMobileMenu">Tech Stack</router-link>
        <router-link to="/contact" @click="closeMobileMenu">Contact</router-link>
      </nav>
    </header>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 CodeNav Technology Ltd. All rights reserved.</p>
        <p class="footer-tagline">Building Tomorrow's Software Today</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: 900;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.logo:hover {
  .logo-code {
    color: #66b1ea;
  }
}

.logo-code {
  transition: all 0.5s;
  color: rgb(217, 217, 217);
}

.logo-nav {
  color: #66b1ea;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.nav-links a.router-link-active {
  color: #667eea;
}

.contact-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  transition: transform 0.3s, box-shadow 0.3s !important;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.contact-btn::after {
  display: none !important;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  display: block;
  width: 25px;
  height: 3px;
  background: #667eea;
  margin: 5px 0;
  transition: all 0.3s;
  border-radius: 2px;
}

.mobile-nav {
  display: none;
  background: white;
  border-top: 1px solid #eee;
  padding: 1rem;
}

.mobile-nav a {
  display: block;
  padding: 1rem;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  border-radius: 8px;
}

.mobile-nav a:hover,
.mobile-nav a.router-link-active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
}

.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: auto;
}

.footer-content p {
  margin: 0.5rem 0;
}

.footer-tagline {
  opacity: 0.9;
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .nav-container {
    padding: 1rem;
  }

  .logo {
    font-size: 1.5rem;
  }
}
</style>
