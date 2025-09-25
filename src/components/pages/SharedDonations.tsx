import { useNavigate } from "react-router-dom"; // Für Navigation nach erfolgreicher Zahlung

// Replace the handleDonateClick function with the following:
const handleDonateClick = async () => {
  const amount = getCurrentAmount();
  if (amount <= 0) {
    toast.error(content?.language === 'de' ? 'Bitte wählen Sie einen Spendenbetrag.' : 'Please select a donation amount.');
    return;
  }

  setProcessingPayment(true);

  try {
    const selectedProjectData = projects.find(p => p.id === selectedProject);
    const projectName = selectedProjectData?.title || "General";

    // Backend-Aufruf für die Checkout-Session
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        donationType,
        projectName,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create session');

    // Weiterleitung zu Stripe
    window.location.href = data.checkoutSessionClientSecret;
  } catch (error) {
    console.error('Payment error:', error);
    toast.error('Fehler beim Erstellen der Zahlung. Bitte versuchen Sie es erneut.');
  } finally {
    setProcessingPayment(false);
  }
};
