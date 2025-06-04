/* Import fonts */
body {
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  background-color: #f5f7fa;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Container */
.container {
  width: 100%;
  max-width: 480px;
  padding: 32px 20px;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 24px rgba(51, 71, 91, 0.10);
  text-align: center;
  margin: 16px;
}

/* Title */
h1 {
  font-size: 2rem;
  color: #1b395a;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

/* Buttons */
button {
  background: linear-gradient(90deg,#4A90E2 0%, #357ABD 100%);
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  margin-top: 18px;
  margin-bottom: 0;
  box-shadow: 0 2px 8px rgba(51, 71, 91, 0.08);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

button:disabled {
  background: #c5cfe6;
  color: #f3f6fa;
  cursor: not-allowed;
}

button:hover:not(:disabled),
button:focus:not(:disabled) {
  background: linear-gradient(90deg,#357ABD 0%, #4A90E2 100%);
  box-shadow: 0 4px 12px rgba(51, 71, 91, 0.13);
  transform: translateY(-2px) scale(1.02);
}

/* Email + Timer + Copier */
.email-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  margin-top: 38px;
  width: 100%;
  flex-wrap: wrap;
}

/* Timer */
.timer-container {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #e8f2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #4A90E2;
  box-shadow: 0 3px 10px rgba(74,144,226, 0.13);
  margin-right: 7px;
  margin-bottom: 7px;
  animation: timerPulse 1.6s infinite alternate;
  transition: border-color 0.3s;
}
@keyframes timerPulse {
  from { box-shadow: 0 0 10px #4A90E222, 0 4px 10px #4A90E233; }
  to   { box-shadow: 0 0 22px #4A90E299, 0 4px 24px #4A90E233; }
}

.timer-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #357ABD;
  text-align: center;
  letter-spacing: 0.5px;
  user-select: none;
}

/* Email container */
.email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 15px;
  background-color: #f3f7fb;
  border-radius: 8px;
  border: 2px solid #4A90E2;
  box-shadow: 0px 4px 10px rgba(51,71,91, 0.08);
  min-width: 140px;
}

.email-box {
  font-size: 1.1rem;
  color: #357ABD;
  word-break: break-word;
  text-align: center;
  letter-spacing: 0.5px;
  margin: 0;
}

/* Copy btn */
.copy-container {
  margin-left: 7px;
  margin-bottom: 7px;
}
.copy-btn {
  background: #4A90E2;
  color: #fff;
  font-size: 1.1rem;
  padding: 8px 13px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #4A90E222;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, transform 0.1s;
}
.copy-btn:hover,
.copy-btn:focus {
  background: #357ABD;
  transform: scale(1.13) rotate(-3deg);
}
.copy-btn:active {
  background: #45b678;
  color: #fff;
}

/* Inbox */
.inbox {
  margin-top: 34px;
  background: #f8fbff;
  padding: 22px 12px 10px 12px;
  border-radius: 10px;
  box-shadow: 0px 3px 13px rgba(51,71,91,0.07);
  min-height: 64px;
}
.message {
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 14px 14px 10px 14px;
  box-shadow: 0px 2px 8px #4A90E209;
  text-align: left;
  font-size: 0.97rem;
}
.message.unread {
  font-weight: 700;
  background: #eaf5ff;
}
.message .date {
  display: block;
  font-size: 12px;
  color: #8c9aad;
  margin-top: 6px;
}
.empty-inbox {
  font-size: 1.03rem;
  color: #aaa;
  margin: 0;
  letter-spacing: 0.4px;
}

/* Spinner (chargement) */
.spinner {
  display: none;
  position: fixed;
  z-index: 9999;
  top: 40%;
  left: 50%;
  width: 48px;
  height: 48px;
  border: 6px solid #d1e6fa;
  border-top: 6px solid #357ABD;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}
@keyframes spin {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg);}
}

/* Toast notification */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #357ABD;
  color: white;
  padding: 13px 28px;
  border-radius: 6px;
  font-size: 1rem;
  z-index: 1000;
  opacity: 0;
  animation: toastAnimation 2.1s forwards;
  box-shadow: 0 2px 8px #4A90E244;
}
@keyframes toastAnimation {
  0%   { opacity: 0; transform: translateX(-50%) translateY(16px);}
  25%  { opacity: 1;}
  80%  { opacity: 1;}
  100% { opacity: 0; transform: translateX(-50%) translateY(24px);}
}

/* Responsive */
@media screen and (max-width: 700px) {
  .container { padding: 22px 4vw; }
  .email-wrapper { flex-direction: column; gap: 12px; }
  .timer-container, .copy-container { margin: 0 0 10px 0; }
}
@media screen and (max-width: 500px) {
  h1 { font-size: 1.2rem; }
  .container { padding: 10vw 2vw; }
  .email-box { font-size: 1rem; }
  .timer-text { font-size: 1rem; }
}

button:focus-visible, .copy-btn:focus-visible {
  outline: 2px solid #45b678;
  outline-offset: 2px;
}
