# Authentication with Supabase Magic Link in Expo

## 1. WHAT I HAVE DONE

I have successfully implemented user authentication in a mobile application using **Supabase's magic link login** method. This was integrated into a React Native app built with **Expo**. The system allows users to enter their email address and receive a magic link to log in securely. Once the user clicks the link in their email, they are automatically logged into the app, and the UI reflects that they are signed in.

I also built a simple UI using `@rneui/themed` components, with feedback messages to guide the user through the login process. Upon successful login, the app switches views and displays a welcome message with the user's email and a sign-out button.

## 2. WHAT I HAVE LEARNT

- How to set up and initialize Supabase in an Expo project.
- How to use Supabase's `signInWithOtp()` method to send magic login links.
- How to manage authentication state using `supabase.auth.getSession()` and `onAuthStateChange()`.
- How to conditionally render components (`Auth` vs `Account`) based on the user's login state.
- Basic setup of **deep linking** with Expo to handle redirection after magic link login.

## 3. WHAT CHALLENGES I HAVE FACED

- Initially, I struggled with how to use Supabase's magic link feature correctly, especially the redirect behavior.
- Deep linking configuration in Expo was unfamiliar and required understanding `scheme` setup and redirect URIs.
- Managing the session and ensuring the app responded correctly after authentication required careful handling of state.
- Debugging errors from Supabase responses (e.g., when email was missing or invalid) needed some learning and logging.

## 4. HOW DID I OVERCOME

- I read through the official **Supabase documentation** and followed examples from both their website and GitHub.
- I used **console logs and alerts** to help debug errors and understand the session lifecycle better.
- I experimented with **Expo deep linking** using `expo-linking` and configured `app.json` with a custom scheme to support redirects.
- I simplified the UI and separated the logic into `Auth.js` and `Account.js` to keep components clean and maintainable.

---


