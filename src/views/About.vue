<template>
  <div class="about">
    <div class="hero-section">
      <h1>About CodeNav Tech</h1>
      <p class="subtitle">Where Developers Lead Innovation</p>
    </div>

    <section class="story-section">
      <div class="container">
        <h2>Our Story</h2>
        <p class="story-text">
          CodeNav Technology Co., Ltd. was born from a simple belief: the best
          software is built by developers who truly understand both code and
          users. As a company fully led by developers, we bring a unique
          perspective to every project we undertake.
        </p>
        <p class="story-text">
          We don't just write code; we craft experiences. We don't just use
          technology; we push its boundaries. Every member of our team is
          passionate about creating software that makes a real difference in how
          people work and live.
        </p>
      </div>
    </section>

    <section class="philosophy-section">
      <div class="container">
        <h2>Our Philosophy</h2>
        <div class="philosophy-grid">
          <div class="philosophy-card">
            <div class="icon">🎯</div>
            <h3>Developer-First Thinking</h3>
            <p>
              We understand the challenges developers face because we face them
              too. This drives us to create tools and solutions that we
              ourselves would love to use.
            </p>
          </div>
          <div class="philosophy-card">
            <div class="icon">🚀</div>
            <h3>Bleeding-Edge Technology</h3>
            <p>
              We're not afraid to adopt the newest technologies. If it makes our
              products better, faster, or more enjoyable to use, we'll learn it,
              master it, and implement it.
            </p>
          </div>
          <div class="philosophy-card">
            <div class="icon">💡</div>
            <h3>User Experience is Everything</h3>
            <p>
              Great code is invisible to users. What they see is a smooth,
              intuitive experience. We obsess over every interaction to ensure
              our software delights.
            </p>
          </div>
          <div class="philosophy-card">
            <div class="icon">🔄</div>
            <h3>Continuous Innovation</h3>
            <p>
              Technology evolves, and so do we. We're constantly learning,
              experimenting, and improving our products to stay ahead of the
              curve.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="values-section">
      <div class="container">
        <h2>Our Core Values</h2>
        <div class="values-list">
          <div class="value-item">
            <span class="value-number">01</span>
            <div class="value-content">
              <h3>Quality Over Quantity</h3>
              <p>
                We believe in doing things right, not just doing them fast.
                Every line of code matters.
              </p>
            </div>
          </div>
          <div class="value-item">
            <span class="value-number">02</span>
            <div class="value-content">
              <h3>Transparency & Honesty</h3>
              <p>
                We communicate openly with our team, our users, and our
                partners. No corporate speak, just truth.
              </p>
            </div>
          </div>
          <div class="value-item">
            <span class="value-number">03</span>
            <div class="value-content">
              <h3>Embrace the Challenge</h3>
              <p>
                Difficult problems excite us. We see challenges as opportunities
                to innovate and grow.
              </p>
            </div>
          </div>
          <div class="value-item">
            <span class="value-number">04</span>
            <div class="value-content">
              <h3>Community Contribution</h3>
              <p>
                We believe in giving back to the developer community through
                open-source contributions and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="team-section">
      <div class="container">
        <h2>Built by Developers, For Everyone</h2>
        <p class="team-description">
          Our team consists of passionate developers who live and breathe code.
          We come from diverse backgrounds but share a common goal: to build
          software that sets new standards for quality and user experience.
        </p>
        <div class="tech-showcase">
          <p>We're fluent in:</p>
          <div class="tech-grid">
            <span class="tech-item">TypeScript</span>
            <span class="tech-item">Swift</span>
            <span class="tech-item">Vue.js</span>
            <span class="tech-item">React</span>
            <span class="tech-item">Node.js</span>
            <span class="tech-item">Python</span>
            <span class="tech-item">Serverless</span>
            <span class="tech-item">PostgreSQL</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Join Us on Our Journey</h2>
        <p>
          Whether you're a user, a developer, or a potential partner, we'd love
          to hear from you.
        </p>
        <router-link to="/contact" class="cta-button">Get in Touch</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// Variables
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$primary-color: #667eea;
$secondary-color: #764ba2;
$text-dark: #333;
$text-medium: #555;
$text-light: #666;
$bg-light: #f8f9fa;
$white: white;
$max-width: 1200px;
$mobile-breakpoint: 768px;
$pattern-bg: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

// Mixins
@mixin section-padding {
  padding: 5rem 2rem;
}

@mixin gradient-text {
  background: $primary-gradient;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@mixin card-shadow {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}

.about {
  min-height: 100vh;
}

.hero-section {
  background: $primary-gradient;
  color: $white;
  @include section-padding;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $pattern-bg;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }
}

.subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  position: relative;
  z-index: 1;
}

.container {
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 2rem;
}

.story-section {
  @include section-padding;
  background: $white;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: $text-dark;
  }
}

.story-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: $text-medium;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.philosophy-section {
  @include section-padding;
  background: $bg-light;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: $text-dark;
  }
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.philosophy-card {
  background: $white;
  padding: 2rem;
  border-radius: 12px;
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

.values-section {
  @include section-padding;
  background: $white;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: $text-dark;
  }
}

.values-list {
  max-width: 800px;
  margin: 0 auto;
}

.value-item {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: background 0.3s;

  &:hover {
    background: $bg-light;
  }
}

.value-number {
  font-size: 2rem;
  font-weight: 900;
  @include gradient-text;
  margin-right: 2rem;
  min-width: 60px;
}

.value-content {
  h3 {
    color: $text-dark;
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-light;
    line-height: 1.6;
  }
}

.team-section {
  @include section-padding;
  background: $bg-light;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: $text-dark;
  }
}

.team-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: $text-medium;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.tech-showcase {
  text-align: center;

  p {
    font-size: 1.2rem;
    color: $text-medium;
    margin-bottom: 2rem;
  }
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

.tech-item {
  background: $primary-gradient;
  color: $white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
}

.cta-section {
  @include section-padding;
  background: $white;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: $text-dark;
  }

  p {
    color: $text-light;
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
}

.cta-button {
  display: inline-block;
  background: $primary-gradient;
  color: $white;
  padding: 1rem 3rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba($primary-color, 0.4);
  }
}

@media (max-width: $mobile-breakpoint) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .philosophy-grid {
    grid-template-columns: 1fr;
  }

  .value-item {
    flex-direction: column;
    text-align: center;
  }

  .value-number {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
