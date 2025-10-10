<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="company-name">
          <span class="code">Code</span><span class="nav">Nav</span> Tech
        </h1>
        <p class="tagline">Building Tomorrow's Software Today</p>
        <p class="subtitle">
          Developer-Led Innovation • Cutting-Edge Technology • User-First Design
        </p>
        <div class="cta-buttons">
          <router-link to="/products" class="btn btn-primary"
            >Explore Our Products</router-link
          >
          <router-link to="/tech-stack" class="btn btn-secondary"
            >Our Tech Stack</router-link
          >
        </div>
      </div>
      <div class="hero-animation">
        <div class="code-block">
          <pre><code>{{ codeAnimation }}</code></pre>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Why CodeNav Tech?</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="icon">🚀</div>
            <h3>Developer-Led</h3>
            <p>
              Founded and run by developers who understand what great software
              needs
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">⚡</div>
            <h3>Latest Tech Stack</h3>
            <p>
              We use and master the newest, most efficient technologies
              available
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">👥</div>
            <h3>User-Centric</h3>
            <p>
              Every line of code is written with the end user's experience in
              mind
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">✨</div>
            <h3>Innovation First</h3>
            <p>
              Pushing boundaries and creating solutions that define the future
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="products-preview">
      <div class="container">
        <h2>Our Products</h2>
        <div class="products-grid">
          <div class="product-card mygrammar">
            <h3>MyGrammar</h3>
            <p>
              Advanced grammar checking and writing enhancement tool powered by
              AI
            </p>
            <router-link to="/products" class="learn-more"
              >Learn More →</router-link
            >
          </div>
          <div class="product-card traffictrack">
            <h3>TrafficTrack</h3>
            <p>
              Real-time traffic analytics and optimization platform for modern
              businesses
            </p>
            <router-link to="/products" class="learn-more"
              >Learn More →</router-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const codeAnimation = ref(`const innovation = () => {
  while (true) {
    create();
    innovate();
    deliver();
  }
};`);

const codeSnippets = [
  `const innovation = () => {
  while (true) {
    create();
    innovate();
    deliver();
  }
};`,
  `class CodeNav {
  build() {
    return software
      .withQuality()
      .withSpeed()
      .withLove();
  }
}`,
  `async function future() {
  const tech = await latest();
  const users = await happy();
  return success;
}`,
];

const stackList = [`Rolldown`, `Vue`, `TsDown`, `React`, `Swift`, ``];

let animationIndex = 0;
let animationInterval: number;

// onMounted(() => {
//   animationInterval = setInterval(() => {
//     animationIndex = (animationIndex + 1) % codeSnippets.length
//     codeAnimation.value = codeSnippets[animationIndex]
//   }, 3000)
// })
function changeCodeBlock() {
  let isRemoved = false;
  setInterval(() => {
    if (!isRemoved) {
    }
  }, 20);
}

onUnmounted(() => {
  clearInterval(animationInterval);
});
</script>

<style scoped lang="scss">
// Variables
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$primary-color: #667eea;
$secondary-color: #764ba2;
$accent-color: #42b883;
$text-dark: #333;
$text-light: #666;
$bg-light: #f8f9fa;
$white: white;
$max-width: 1200px;
$mobile-breakpoint: 768px;

// Mixins
@mixin section-padding {
  padding: 5rem 2rem;
}

@mixin card-shadow {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}

@mixin gradient-text($gradient) {
  background: $gradient;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home {
  min-height: 100vh;
}

.hero {
  min-height: 600px;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem 5%;
  background: $primary-gradient;
  color: $white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}

.hero-content {
  flex: 1;
  z-index: 2;
  max-width: 600px;
}

.company-name {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: -0.4px;

  .code {
    @include gradient-text(linear-gradient(90deg, #fff, #f0f0f0));
  }

  .nav {
    @include gradient-text(linear-gradient(90deg, #47eded, #4498e7));
  }
}

.tagline {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 300;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;

  &-primary {
    background: $white;
    color: $primary-color;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  }

  &-secondary {
    background: transparent;
    color: $white;
    border: 2px solid $white;

    &:hover {
      background: $white;
      color: $primary-color;
    }
  }
}

.hero-animation {
  // flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.code-block {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);

  pre {
    margin: 0;
    color: $accent-color;
    font-family: "Fira Code", monospace;
    font-size: 1.1rem;
    text-shadow: 0 0 10px rgba($accent-color, 0.5);
  }
}

.features {
  @include section-padding;
  background: $bg-light;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: $text-dark;
  }
}

.container {
  max-width: $max-width;
  margin: 0 auto;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: $white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  @include card-shadow;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: $text-dark;
    margin-bottom: 1rem;
  }

  p {
    color: $text-light;
    line-height: 1.6;
  }
}

.products-preview {
  @include section-padding;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: $text-dark;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.product-card {
  padding: 2.5rem;
  border-radius: 16px;
  color: $white;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;

  &.mygrammar {
    background: $primary-gradient;
  }

  &.traffictrack {
    background: $secondary-gradient;
  }

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    opacity: 0.95;
  }
}

.learn-more {
  color: $white;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateX(5px);
  }
}

@keyframes shimmer {
  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
}

@media (max-width: $mobile-breakpoint) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .company-name {
    font-size: 3rem;
  }

  .tagline {
    font-size: 1.5rem;
  }

  .hero-animation {
    margin-top: 2rem;
  }

  .code-block {
    padding: 1rem;

    pre {
      font-size: 0.9rem;
    }
  }
}
</style>
