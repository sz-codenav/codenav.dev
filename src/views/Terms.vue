<template>
  <div class="terms-conditions">
    <div class="hero-section">
      <h1>Terms & Conditions</h1>
      <p class="last-updated"><strong>Last updated:</strong> January 4, 2026</p>
    </div>

    <div class="content-section">
      <div class="container">
        <p>These Terms and Conditions apply to all products and services provided under the <strong>CodeNav</strong>
          brand (collectively, the "Services"). By accessing or using any CodeNav Service, you agree to be bound by
          these Terms.</p>

        <h2>Use of the Services</h2>
        <p>You may not copy, modify, distribute, reverse engineer, or create derivative works from the Services without
          our written permission. All intellectual property rights remain the exclusive property of CodeNav.</p>

        <h2>Service Availability and Changes</h2>
        <p>We may modify, suspend, or discontinue any part of the Services at any time. Pricing or feature changes will
          be communicated where required.</p>

        <h2>User Responsibilities</h2>
        <p>You are responsible for maintaining the security of your devices and accounts and for any network or data
          charges incurred.</p>

        <h2>Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, CodeNav shall not be liable for indirect or consequential damages
          arising from your use of the Services.</p>

        <h2>Termination</h2>
        <p>We may terminate or suspend access to the Services at any time. Upon termination, you must cease using the
          Services.</p>

        <h2>Refund Policy</h2>
        <p>CodeNav provides refunds under the following conditions:</p>
        <ul>
          <li><strong>Consumable or virtual assets</strong> (e.g., tokens, coins, or similar assets that can be
            recharged and consumed) can be refunded within 7 days of purchase, provided they have not been used.</li>
          <li><strong>Subscription-based products</strong> (e.g., membership plans) may be refunded within 3 days of the
            initial subscription. If the subscription period is 3 months or longer, refunds may be requested within 7
            days of the subscription start.</li>
        </ul>
        <p>
          Please note that this refund policy only applies to genuine trial usage or accidental purchase situations.
          Refund requests may be denied in cases of abuse, such as repeatedly requesting refunds within the eligible
          period and resubscribing.
        </p>

        <h2>Changes to These Terms</h2>
        <p>We may update these Terms from time to time. Continued use of the Services constitutes acceptance of the
          updated Terms.</p>

        <h2>Contact Us</h2>
        <p>For questions regarding these Terms or the Refund Policy, contact us at: <a
            href="mailto:support@codenav.dev">support@codenav.dev</a></p>

        <footer class="policy-footer">© 2025 CodeNav. All rights reserved.</footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #858585 0%, #000000 100%);
$primary-color: #667eea;
$text-dark: #333;
$text-medium: #555;
$text-light: #666;
$bg-light: #f8f9fa;
$white: white;
$max-width: 900px;
$mobile-breakpoint: 768px;

.terms-conditions {
  min-height: 100vh;
  background: $bg-light;
}

.hero-section {
  background: $primary-gradient;
  color: $white;
  padding: 4rem 2rem 3rem;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }
}

.last-updated {
  font-size: 1.1rem;
  opacity: 0.95;
}

.content-section {
  padding: 3rem 2rem;
}

.container {
  max-width: $max-width;
  margin: 0 auto;
  background: $white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  line-height: 1.6;
  color: $text-dark;

  h2 {
    margin-top: 2em;
    color: $text-dark;
    font-size: 1.8rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.3em;
  }

  h3 {
    margin-top: 1.5em;
    color: $text-medium;
    font-size: 1.4rem;
  }

  p {
    margin: 0.6em 0;
    color: $text-medium;
  }

  ul {
    padding-left: 1.2em;

    li {
      margin: 0.6em 0;
      color: $text-medium;
    }
  }

  a {
    color: $primary-color;
    text-decoration: none;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}

.policy-footer {
  margin-top: 4em;
  font-size: 0.9em;
  color: $text-light;
  border-top: 1px solid #eee;
  padding-top: 1em;
}

@media (max-width: $mobile-breakpoint) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .container {
    padding: 2rem 1.5rem;
  }

  .content-section {
    padding: 2rem 1rem;
  }
}
</style>
