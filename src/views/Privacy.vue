<template>
  <div class="privacy-policy">
    <div class="hero-section">
      <h1>Privacy Policy</h1>
      <p class="last-updated"><strong>Last updated:</strong> January 4, 2026</p>
    </div>

    <div class="content-section">
      <div class="container">
        <p>
          This Privacy Policy applies to all software products, applications, and services operated under the
          <strong>CodeNav</strong> brand (collectively, the "Services"), including but not limited to web-based SaaS
          products,
          mobile applications, subscription services, and membership-based offerings.
        </p>

        <p>
          The Services are provided by <strong>CodeNav</strong> (the "Service Provider", "we", "us", or "our") on an
          <strong>"AS IS"</strong> basis. By using any CodeNav Service, you agree to the collection and use of
          information in accordance with this Privacy Policy.
        </p>

        <h2>Information Collection and Use</h2>
        <p>We may collect information when you download, access, or use our Services, including but not limited to:</p>
        <ul>
          <li>Your device's Internet Protocol (IP) address</li>
          <li>Pages or features you visit and usage duration</li>
          <li>Date and time of access</li>
          <li>Operating system, browser type, and device information</li>
        </ul>

        <h3>Location Information</h3>
        <p>Some Services may collect approximate location information derived from IP address or device settings to:</p>
        <ul>
          <li>Provide localized or personalized content</li>
          <li>Analyze usage trends and improve functionality</li>
          <li>Support analytics and infrastructure operations</li>
        </ul>
        <p>We do not collect precise real-time GPS location unless explicitly stated in a specific product.</p>

        <h2>Personally Identifiable Information</h2>
        <p>For certain features, we may request personally identifiable information such as User ID, email address, or
          account-related identifiers. This information is retained and used only as described in this Privacy Policy.
        </p>

        <h2>Use of Information</h2>
        <ul>
          <li>Operate, maintain, and improve our Services</li>
          <li>Provide customer support</li>
          <li>Send service-related notices and updates</li>
          <li>Send marketing communications where permitted by law</li>
        </ul>

        <h2>Third-Party Access and Data Sharing</h2>
        <p>We may share information only in the following circumstances:</p>
        <ul>
          <li>Aggregated and anonymized data with analytics or infrastructure providers</li>
          <li>Trusted service providers acting on our behalf under confidentiality obligations</li>
          <li>Legal compliance, law enforcement, or government requests</li>
          <li>Protection of our rights, users, or public safety</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>Opt-Out Rights</h2>
        <p>You can stop all information collection by discontinuing use of the Services. For mobile applications, this
          can be done by uninstalling the application.</p>

        <h2>Data Retention</h2>
        <p>We retain personal data for as long as you use the Services and for a reasonable period thereafter.</p>
        <p>To request data deletion, contact us at: <a href="mailto:support@codenav.dev">support@codenav.dev</a></p>

        <h2>Children's Privacy</h2>
        <p>Our Services are not intended for children under 13, and we do not knowingly collect personal information
          from children. Users must be at least 16 years of age (or the minimum age required in your jurisdiction) to
          consent to data processing, unless parental consent is permitted by law.</p>

        <h2>Security</h2>
        <p>We implement reasonable physical, electronic, and administrative safeguards to protect your information, but
          no system is completely secure.</p>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
          effective date. Continued use of the Services constitutes acceptance of the updated policy.</p>

        <h2>Your Consent</h2>
        <p>By using any CodeNav Service, you consent to the processing of your information as described in this Privacy
          Policy.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions regarding this Privacy Policy, please contact us at: <a
            href="mailto:support@codenav.dev">support@codenav.dev</a></p>

        <footer class="policy-footer">© 2025 CodeNav. All rights reserved.</footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$primary-color: #667eea;
$text-dark: #333;
$text-medium: #555;
$text-light: #666;
$bg-light: #f8f9fa;
$white: white;
$max-width: 900px;
$mobile-breakpoint: 768px;

.privacy-policy {
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