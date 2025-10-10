<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for doesn't exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
// SCSS Variables
$primary-color: #42b883;
$primary-hover: #35a372;
$dark-color: #333;
$medium-gray: #666;
$white: white;

$font-size-404: 5rem;
$font-size-404-mobile: 3.5rem;
$font-size-heading: 2rem;
$font-size-heading-mobile: 1.5rem;
$font-size-text: 1rem;

$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
$spacing-md: 1.5rem;
$spacing-lg: 2rem;

$border-radius: 4px;
$border-width: 2px;

$min-height: 60vh;
$mobile-breakpoint: 768px;

$transition-duration: 0.3s;

// SCSS Mixins
@mixin flex-center-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@mixin button-link {
  color: $primary-color;
  text-decoration: none;
  padding: 0.75rem $spacing-md;
  border: $border-width solid $primary-color;
  border-radius: $border-radius;
  transition: all $transition-duration;
  font-weight: 600;
  display: inline-block;

  &:hover {
    background-color: $primary-color;
    color: $white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba($primary-color, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
  }
}

@mixin responsive-text($desktop-size, $mobile-size) {
  font-size: $desktop-size;

  @media (max-width: $mobile-breakpoint) {
    font-size: $mobile-size;
  }
}

// Main Styles
.not-found {
  padding: $spacing-lg;
  text-align: center;
  min-height: $min-height;
  @include flex-center-column;

  h1 {
    @include responsive-text($font-size-404, $font-size-404-mobile);
    color: $primary-color;
    margin-bottom: $spacing-xs;
    font-weight: 900;
    text-shadow: 2px 2px 4px rgba($primary-color, 0.1);
  }

  h2 {
    @include responsive-text($font-size-heading, $font-size-heading-mobile);
    color: $dark-color;
    margin-bottom: $spacing-sm;
    font-weight: 600;
  }

  p {
    color: $medium-gray;
    margin-bottom: $spacing-lg;
    font-size: $font-size-text;
    line-height: 1.6;
    max-width: 400px;
  }

  a {
    @include button-link;
  }
}

// Additional responsive adjustments
@media (max-width: $mobile-breakpoint) {
  .not-found {
    padding: $spacing-sm;
    min-height: 50vh;
  }
}
</style>