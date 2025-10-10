<template>
  <div class="tech-stack">
    <div class="hero-section">
      <h1>Our Tech Stack</h1>
      <p class="subtitle">Cutting-edge technologies for exceptional products</p>
    </div>

    <section
      class="stack-section"
      v-for="stack in stacks"
      :key="stack.category"
    >
      <div class="container">
        <h2>{{ stack.category }}</h2>
        <div class="tech-grid">
          <div
            class="tech-card"
            v-for="tech in stack.technologies"
            :key="tech.name"
          >
            <div class="tech-logo" v-if="!tech.logo.includes('.')">
              {{ tech.logo }}
            </div>
            <img
              v-else
              :src="tech.logo"
              :alt="tech.name"
              class="tech-logo"
              :style="{ borderRadius: tech.rounded + 'px' }"
            />
            <h3>{{ tech.name }}</h3>
            <p>{{ tech.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Interested in Our Technology?</h2>
        <p>Let's discuss how our tech stack can power your next project</p>
        <router-link to="/contact" class="cta-button"
          >Talk Tech With Us</router-link
        >
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const stacks = [
  {
    category: "Frontend Technologies",
    technologies: [
      {
        name: "Vue 3",
        logo: "/vue.svg",
        description: "Progressive JavaScript framework with Composition API",
      },
      {
        name: "TypeScript",
        logo: "/ts.png",
        rounded: 8,
        description: "Type-safe development with superior IDE support",
      },
      {
        name: "Vite",
        logo: "/vite.svg",
        description: "Lightning-fast HMR and optimized build tooling",
      },
      {
        name: "React",
        logo: "/react.svg",
        description: "JavaScript library for building user interfaces",
      },
    ],
  },
  {
    category: "Backend Technologies",
    technologies: [
      {
        name: "Node.js",
        logo: "/node.png",
        description: "JavaScript runtime for scalable network applications",
      },
      {
        name: "PostgreSQL",
        logo: "/postgre.png",
        description: "Powerful, Row Level Security database system",
      },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    technologies: [
      {
        name: "Serverless",
        logo: "☸️",
        description: "Event-driven architecture for scalable applications",
      },
      {
        name: "Docker",
        logo: "/docker.svg",
        description: "Containerization for consistent environments",
      },
      {
        name: "GitHub Actions",
        logo: "🔄",
        description: "CI/CD automation for seamless delivery",
      },
      {
        name: "Cloud Native",
        logo: "☁️",
        description: "AWS, GCP, and Azure for global scalability",
      },
    ],
  },
];
</script>

<style scoped lang="scss">
// SCSS Variables
$primary-color: #667eea;
$secondary-color: #764ba2;
$accent-color: #42b883;
$dark-color: #333;
$medium-gray: #666;
$light-gray: #f8f9fa;
$white: white;

$font-size-hero: 3.5rem;
$font-size-hero-mobile: 2.5rem;
$font-size-heading: 2.5rem;
$font-size-subheading: 1.5rem;
$font-size-subtitle: 1.3rem;
$font-size-button: 1.1rem;
$font-size-cta-text: 1.2rem;

$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
$spacing-md: 2rem;
$spacing-lg: 3rem;
$spacing-xl: 5rem;

$container-max-width: 1200px;
$principles-max-width: 1000px;
$card-min-width: 250px;

$border-radius-sm: 8px;
$border-radius-md: 12px;
$border-radius-lg: 50px;

$mobile-breakpoint: 768px;

$gradient-primary: linear-gradient(
  135deg,
  $primary-color 0%,
  $secondary-color 100%
);
$gradient-subtle: linear-gradient(
  135deg,
  rgba($primary-color, 0.1) 0%,
  rgba($secondary-color, 0.1) 100%
);

$box-shadow-light: 0 5px 15px rgba(0, 0, 0, 0.08);
$box-shadow-medium: 0 15px 30px rgba(0, 0, 0, 0.15);
$box-shadow-cta: 0 10px 30px rgba($primary-color, 0.4);

$pattern-bg: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

$transition-standard: all 0.3s;
$transition-float: 3s ease-in-out infinite;

// SCSS Mixins
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin section-padding {
  padding: $spacing-xl $spacing-md;
}

@mixin grid-responsive($min-width: $card-min-width) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($min-width, 1fr));
  gap: $spacing-md;
}

@mixin card-hover-effect {
  transition: $transition-standard;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $box-shadow-medium;
    border-color: $primary-color;
  }
}

@mixin button-hover-lift {
  transition: $transition-standard;

  &:hover {
    transform: translateY(-2px);
  }
}

@mixin heading-style($size: $font-size-heading) {
  font-size: $size;
  text-align: center;
  color: $dark-color;
  margin-bottom: $spacing-lg;
}

// Main Styles
.tech-stack {
  min-height: 100vh;
}

.hero-section {
  background: $gradient-primary;
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
    font-size: $font-size-hero;
    font-weight: 900;
    margin-bottom: $spacing-sm;
    position: relative;
    z-index: 1;
  }
}

.subtitle {
  font-size: $font-size-subtitle;
  opacity: 0.95;
  position: relative;
  z-index: 1;
}

.container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $spacing-md;
}

.stack-section {
  @include section-padding;
  background: $white;

  &.alt-bg {
    background: $light-gray;

    .tech-card {
      background: $light-gray;
    }
  }

  h2 {
    @include heading-style;
  }
}

.tech-grid {
  @include grid-responsive;
}

.tech-card {
  background: $white;
  padding: $spacing-md;
  border-radius: $border-radius-md;
  box-shadow: $box-shadow-light;
  text-align: center;
  border: 2px solid transparent;
  @include card-hover-effect;

  h3 {
    color: $dark-color;
    margin-bottom: $spacing-xs;
    font-size: $font-size-subheading;
  }

  p {
    color: $medium-gray;
    line-height: 1.6;
  }
}

img.tech-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.tech-logo {
  font-size: 3rem;
  margin-bottom: $spacing-sm;
  display: inline-block;
  animation: float $transition-float;

  @for $i from 2 through 4 {
    .tech-card:nth-child(#{$i}) & {
      animation-delay: #{($i - 1) * 0.5}s;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.principles-section {
  @include section-padding;
  background: $gradient-subtle;

  h2 {
    @include heading-style;
  }
}

.principles-grid {
  @include grid-responsive;
  max-width: $principles-max-width;
  margin: 0 auto;
}

.principle {
  text-align: center;
  padding: $spacing-md;

  h3 {
    color: $primary-color;
    margin-bottom: $spacing-sm;
    font-size: $font-size-subheading;
  }

  p {
    color: #555;
    line-height: 1.6;
  }
}

.cta-section {
  @include section-padding;
  background: $white;
  text-align: center;

  h2 {
    @include heading-style;
    margin-bottom: $spacing-sm;
  }

  p {
    color: $medium-gray;
    margin-bottom: $spacing-md;
    font-size: $font-size-cta-text;
  }
}

.cta-button {
  display: inline-block;
  background: $gradient-primary;
  color: $white;
  padding: $spacing-sm $spacing-lg;
  border-radius: $border-radius-lg;
  text-decoration: none;
  font-weight: 600;
  font-size: $font-size-button;
  @include button-hover-lift;

  &:hover {
    box-shadow: $box-shadow-cta;
  }
}

// Responsive Design
@media (max-width: $mobile-breakpoint) {
  .hero-section {
    h1 {
      font-size: $font-size-hero-mobile;
    }
  }

  .tech-grid,
  .principles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
