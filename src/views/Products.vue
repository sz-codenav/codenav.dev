<template>
  <div class="products">
    <div class="hero-section">
      <h1>Our Products</h1>
      <p class="subtitle">
        Innovative solutions built with cutting-edge technology
      </p>
    </div>

    <section class="product-showcase">
      <div class="product mygrammar-section">
        <div class="product-content">
          <div class="product-info">
            <h2>MyGrammar</h2>
            <p class="product-tagline">Write with confidence, powered by AI</p>
            <p class="product-description">
              MyGrammar is an advanced assistant that help you to fix your
              grammar. Using AI to process your request, it helps users write
              clearer, more effective content.
            </p>
            <div class="features-list">
              <div class="feature-item">
                <span class="check">✓</span> Grammar and style suggestions by AI
              </div>
              <div class="feature-item">
                <span class="check">✓</span> Pay-as-you-go
              </div>
              <div class="feature-item">
                <span class="check">✓</span> Multi scene support
              </div>
              <div class="feature-item">
                <span class="check">✓</span> Tone and clarity optimization
              </div>
              <div class="feature-item">
                <span class="check">✓</span> No-Ads
              </div>
            </div>
            <div class="info-flex">
              <div class="tech-stack">
                <h4>Built with:</h4>
                <div class="tech-badges">
                  <span class="tech-badge">Swift</span>
                  <span class="tech-badge">iOS</span>
                </div>
              </div>
              <a
                class="explore-link"
                href="https://mygrammar.xiaodong.moe/"
                target="_blank"
                >Explore</a
              >
            </div>
          </div>
          <div class="product-visual">
            <div class="mockup-container">
              <div class="mockup-screen">
                <div class="mockup-header">MyGrammar</div>
                <div class="mockup-content">
                  <p class="sample-text">
                    <span class="correction">Your</span> writing is being
                    enhanced...
                  </p>
                  <div class="suggestion-box">
                    <span class="suggestion-icon">💡</span>
                    Suggestion: Consider using more active voice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="product traffictrack-section">
        <div class="product-content reverse">
          <div class="product-visual">
            <div class="mockup-container">
              <div class="mockup-screen dark">
                <div class="mockup-header">TrafficTrack ETA</div>
                <div class="chart-container">
                  <div class="chart-bar" style="height: 60%"></div>
                  <div class="chart-bar" style="height: 80%"></div>
                  <div class="chart-bar" style="height: 45%"></div>
                  <div class="chart-bar" style="height: 90%"></div>
                  <div class="chart-bar" style="height: 70%"></div>
                </div>
                <div class="stats-row">
                  <div class="stat">
                    <span class="stat-value">47 Lines</span>
                    <span class="stat-label">Tracking</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">3.7 min</span>
                    <span class="stat-label">Arrival Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-info">
            <h2>TrafficTrack</h2>
            <p class="product-tagline">Real-time ETA on your Phone</p>
            <p class="product-description">
              TrafficTrack provides real-time traffic ETA at Hong Kong, data
              directly provided by the goverment's API. No Ads inside, let you
              be able to get the information in one second after you click
              inside the App.
            </p>
            <div class="features-list">
              <div class="feature-item">
                <span class="check">✓</span> Real-time ETA
              </div>
              <div class="feature-item">
                <span class="check">✓</span> Advanced user behavior setting
              </div>
              <div class="feature-item">
                <span class="check">✓</span> Launch as fast as possible
              </div>
              <div class="feature-item">
                <span class="check">✓</span> Get the information at first second
              </div>
              <div class="feature-item">
                <span class="check">✓</span> No-Ads
              </div>
            </div>
            <div class="info-flex">
              <div class="tech-stack">
                <h4>Built with:</h4>
                <div class="tech-badges">
                  <span class="tech-badge">Swift</span>
                  <span class="tech-badge">iOS</span>
                </div>
              </div>
              <a
                class="explore-link"
                href="https://traffictrack.xiaodong.moe/"
                target="_blank"
                >Explore</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <h2>Ready to Transform Your Workflow?</h2>
      <p>Join thousands of users who trust CodeNav Tech products</p>
      <router-link to="/contact" class="cta-button">Get Started</router-link>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// Variables
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$primary-color: #667eea;
$secondary-color: #f093fb;
$accent-color: #42b883;
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

@mixin gradient-text($gradient) {
  background: $gradient;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.products {
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

.product-showcase {
  @include section-padding;
}

.product {
  max-width: $max-width;
  margin: 0 auto 6rem;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  &.reverse {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }
}

.product-info {
  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    @include gradient-text($primary-gradient);
  }
}

.traffictrack-section {
  .product-info h2 {
    @include gradient-text($secondary-gradient);
  }
}

.product-tagline {
  font-size: 1.3rem;
  color: $text-light;
  margin-bottom: 1.5rem;
}

.product-description {
  color: $text-medium;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.features-list {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #444;

  .check {
    color: $accent-color;
    font-size: 1.2rem;
    margin-right: 1rem;
  }
}

.info-flex {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
}

.tech-stack {
  h4 {
    color: $text-dark;
    margin-bottom: 1rem;
  }
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background: #f0f0f0;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: $text-medium;
}

.explore-link {
  display: inline-block;
  background: $primary-gradient;
  color: $white;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba($primary-color, 0.3);
  }
}

.product-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup-container {
  width: 100%;
  max-width: 450px;
}

.mockup-screen {
  background: $white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  border: 1px solid #e0e0e0;

  &.dark {
    background: #1a1a1a;
    color: $white;
    border-color: #333;

    .mockup-header {
      border-bottom-color: #333;
    }
  }
}

.mockup-header {
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.sample-text {
  color: $text-light;
  line-height: 1.6;
}

.correction {
  background: #ffeb3b;
  padding: 2px 4px;
  border-radius: 2px;
  color: $text-dark;
}

.suggestion-box {
  background: #f0f9ff;
  border-left: 3px solid $accent-color;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .suggestion-icon {
    font-size: 1.2rem;
  }
}

.chart-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 150px;
  margin-bottom: 2rem;
}

.chart-bar {
  width: 40px;
  background: linear-gradient(180deg, $secondary-color 0%, #f5576c 100%);
  border-radius: 4px 4px 0 0;
  animation: grow 1s ease-out;
}

@keyframes grow {
  from {
    height: 0;
  }
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat {
  text-align: center;

  &-value {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: $secondary-color;
  }

  &-label {
    display: block;
    font-size: 0.9rem;
    color: #888;
    margin-top: 0.25rem;
  }
}

.cta-section {
  background: $bg-light;
  @include section-padding;
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
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba($primary-color, 0.4);
  }
}

@media (max-width: $mobile-breakpoint) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;

    &.reverse {
      direction: ltr;
    }
  }

  .product {
    margin-bottom: 4rem;
  }
}
</style>
