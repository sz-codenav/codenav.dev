<template>
  <div class="contact-container">
    <div class="contact-hero">
      <h1>Let's Connect</h1>
      <p>
        Have a question or want to work together? We'd love to hear from you.
      </p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <h2>Get in Touch</h2>
        <div class="info-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div>
            <h3>Email</h3>
            <p>hi@codenav.dev</p>
          </div>
        </div>
        <div class="info-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div>
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              placeholder="John Doe"
              :class="{ 'has-value': formData.name }"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="john@example.com"
              :class="{ 'has-value': formData.email }"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            v-model="formData.subject"
            placeholder="How can we help you?"
            :class="{ 'has-value': formData.subject }"
            required
          />
        </div>

        <div class="form-group">
          <label for="message">Your Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            placeholder="Tell us more about your project or inquiry..."
            :class="{ 'has-value': formData.message }"
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Send Message</span>
          <span v-else class="loading">
            <svg class="spinner" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="3"
                fill="none"
                stroke-dasharray="31.416"
                stroke-dashoffset="31.416"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="1s"
                  repeatCount="indefinite"
                  from="31.416"
                  to="0"
                />
              </circle>
            </svg>
            Sending...
          </span>
        </button>

        <div v-if="statusMessage" :class="['status-message', statusType]">
          {{ statusMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const statusMessage = ref("");
const statusType = ref("");

const handleSubmit = async () => {
  isSubmitting.value = true;
  statusMessage.value = "";

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);

    statusMessage.value = "Thank you! Your message has been sent successfully.";
    statusType.value = "success";

    Object.keys(formData).forEach((key) => {
      formData[key as keyof typeof formData] = "";
    });
  } catch (error) {
    statusMessage.value = "Oops! Something went wrong. Please try again.";
    statusType.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$primary-color: #667eea;
$primary-hover: #5a6fd8;
$secondary-color: #764ba2;
$accent-color: #42b883;
$text-color: #333;
$text-light: #666;
$border-color: #e1e4e8;
$bg-light: #f8f9fa;
$bg-hover: #f0f0f0;
$white: #ffffff;
$success-color: #28a745;
$error-color: #dc3545;
$pattern-bg: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
$spacing-md: 1.5rem;
$spacing-lg: 2rem;
$spacing-xl: 3rem;

$border-radius: 8px;
$transition: all 0.3s ease;

.contact-container {
  min-height: calc(100vh - 66px - 125px);
  background: $primary-gradient;
  padding: $spacing-lg;
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
    pointer-events: none;
  }
}

.contact-hero {
  text-align: center;
  color: $white;
  margin-bottom: $spacing-xl;
  animation: fadeInDown 0.8s ease;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: $spacing-md 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.25rem;
    opacity: 0.95;
    max-width: 600px;
    margin: 0 auto;
  }
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $spacing-lg;
  animation: fadeInUp 0.8s ease;
  position: relative;
  z-index: 1;
}

.contact-info {
  background: rgba($white, 0.95);
  backdrop-filter: blur(10px);
  border-radius: $border-radius;
  padding: $spacing-lg;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  h2 {
    color: $secondary-color;
    margin-bottom: $spacing-md;
    font-size: 1.5rem;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: $spacing-md;
    padding: $spacing-sm;
    border-radius: $border-radius;
    transition: $transition;

    &:hover {
      background: $bg-light;
      transform: translateX(5px);
    }

    svg {
      width: 24px;
      height: 24px;
      color: $primary-color;
      margin-right: $spacing-sm;
      flex-shrink: 0;
      margin-top: 2px;
    }

    h3 {
      color: $secondary-color;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    p {
      color: $text-light;
      font-size: 0.9rem;
    }
  }
}

.contact-form {
  background: rgba($white, 0.95);
  backdrop-filter: blur(10px);
  border-radius: $border-radius;
  padding: $spacing-lg;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;
  }

  .form-group {
    margin-bottom: $spacing-md;

    label {
      display: block;
      color: $secondary-color;
      font-weight: 600;
      margin-bottom: $spacing-xs;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem $spacing-sm;
      border: 2px solid $border-color;
      border-radius: calc($border-radius / 2);
      font-size: 1rem;
      transition: $transition;
      background: $white;

      &::placeholder {
        color: #999;
      }

      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
      }

      &.has-value {
        border-color: $primary-hover;
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
      font-family: inherit;
    }
  }

  .submit-btn {
    width: 100%;
    padding: $spacing-sm $spacing-lg;
    background: $primary-gradient;
    color: $white;
    border: none;
    border-radius: calc($border-radius / 2);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: $transition;
    position: relative;
    overflow: hidden;

    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba($primary-color, 0.3);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-xs;
    }

    .spinner {
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
    }
  }

  .status-message {
    margin-top: $spacing-md;
    padding: $spacing-sm;
    border-radius: calc($border-radius / 2);
    text-align: center;
    font-weight: 500;
    animation: slideIn 0.3s ease;

    &.success {
      background: rgba($success-color, 0.1);
      color: $success-color;
      border: 1px solid rgba($success-color, 0.3);
    }

    &.error {
      background: rgba($error-color, 0.1);
      color: $error-color;
      border: 1px solid rgba($error-color, 0.3);
    }
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .contact-hero h1 {
    font-size: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-form .form-row {
    grid-template-columns: 1fr;
  }

  .contact-info {
    margin-bottom: $spacing-md;
  }
}
</style>
