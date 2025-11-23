import React, { useState } from "react";
import {
  Truck,
  Home,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Star,
} from "lucide-react";

export default function ChristmasTreeService() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    treeSize: "",
    package: "basis",
    disposal: false,
    notes: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const FORMSPREE_ID = "xnnrkpwr";

  const CONTACT_EMAIL = "weihnachtsbaumlieferungIN@gmail.com";

  const packages = [
    {
      id: "basis",
      name: "Basis-Paket",
      price: 49,
      features: [
        "Persönliche Besorgung nach Ihren Wünschen",
        "Lieferung bis zur Haustür",
        "Foto-Vorschau des Baumes",
      ],
    },
    {
      id: "premium",
      name: "Premium-Paket",
      price: 65,
      features: [
        "Persönliche Besorgung",
        "Lieferung bis zur Haustür",
        "Hochtragen in die Wohnung",
        "Professionelles Aufstellen",
        "Foto-Vorschau des Baumes",
      ],
      popular: true,
    },
  ];

  const calculateTotal = () => {
    const packagePrice =
      packages.find((p) => p.id === formData.package)?.price || 0;
    const disposalPrice = formData.disposal ? 40 : 0;
    return packagePrice + disposalPrice;
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bestellung versendet!
          </h2>
          <p className="text-gray-700 mb-6">
            Vielen Dank für Ihre Bestellung! Wir haben Ihre Anfrage erhalten und
            melden uns in Kürze bei Ihnen.
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-gray-800 font-semibold mb-2">
              💳 Zahlungshinweis
            </p>
            <p className="text-gray-600 text-sm">
              Die Bezahlung erfolgt bequem in bar bei Lieferung.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-600 text-sm">
              Bei Fragen erreichen Sie uns unter:
              weihnachtsbaumlieferungIN@gmail.com
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <button
            onClick={() => {
              setOrderComplete(false);
              setShowOrderForm(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                treeSize: "",
                package: "basis",
                disposal: false,
                notes: "",
              });
            }}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

 if (showOrderForm) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Baum bestellen
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // Standard-Weiterleitung verhindern
            fetch(`https://formsubmit.co/${CONTACT_EMAIL}`, {
              method: "POST",
              body: new FormData(e.target),
            })
              .then(() => {
                setOrderComplete(true); // Danke-Popup
                setShowOrderForm(false);
              })
              .catch((err) => console.error("Fehler beim Absenden:", err));
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
              Lieferadresse *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="treeSize" className="block text-gray-700 font-semibold mb-2">
              Baumgröße *
            </label>
            <select
              id="treeSize"
              name="treeSize"
              required
              value={formData.treeSize}
              onChange={(e) =>
                setFormData({ ...formData, treeSize: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Bitte wählen</option>
              <option value="120-150 cm">120-150 cm</option>
              <option value="150-175 cm">150-175 cm</option>
              <option value="175-200 cm">175-200 cm</option>
              <option value="200-225 cm">200-225 cm</option>
              <option value="Über 225 cm">Über 225 cm</option>
            </select>
          </div>

          <input type="hidden" name="baumart" value="Nordmanntanne" />

          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Service-Paket *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                    formData.package === pkg.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  } ${pkg.popular ? "ring-2 ring-red-400" : ""}`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={`${pkg.name} - ${pkg.price}€`}
                    checked={formData.package === pkg.id}
                    onChange={(e) =>
                      setFormData({ ...formData, package: pkg.id })
                    }
                    className="sr-only"
                  />
                  {pkg.popular && (
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">
                      BELIEBT
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-3">
                    {pkg.price}€
                  </p>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="entsorgung"
                value="Ja, Entsorgung gewünscht (+40€)"
                checked={formData.disposal}
                onChange={(e) =>
                  setFormData({ ...formData, disposal: e.target.checked })
                }
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <span className="ml-3 text-gray-700">
                Abholung & Entsorgung nach Weihnachten (+40€)
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="notes" className="block text-gray-700 font-semibold mb-2">
              Besondere Wünsche
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="z.B. besonders dicht, symmetrisch..."
            />
          </div>

          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">
                Service-Gesamtpreis:
              </span>
              <span className="text-2xl font-bold text-green-600">
                {calculateTotal()}€
              </span>
            </div>
            <p className="text-xs text-gray-600">+ Baumpreis (wird nach Auswahl mitgeteilt)</p>
            <p className="text-xs text-gray-600 mt-2 font-semibold">
              💳 Bezahlung in bar bei Lieferung
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowOrderForm(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Jetzt bestellen
            </button>
          </div>

          {/* Formsubmit Hidden Inputs für Bestätigungsemail */}
          <input type="hidden" name="_replyto" value={formData.email} />
          <input
            type="hidden"
            name="_autoresponse"
            value={`Hallo ${formData.name},\n\nvielen Dank für deine Bestellung! Wir haben sie erhalten und melden uns in Kürze.\n\nDein Weihnachtsbaum-Service Ingolstadt`}
          />
        </form>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">❄</div>
          <div className="absolute top-40 right-20 text-7xl">✨</div>
          <div className="absolute bottom-20 left-1/4 text-8xl">🎄</div>
          <div className="absolute top-1/3 right-1/3 text-6xl">⭐</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-pulse">🎄</div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Weihnachtsbaum-Service
              <br />
              Ingolstadt
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-green-100 max-w-2xl mx-auto">
              Wir bringen Ihnen den perfekten Weihnachtsbaum – direkt bis zur
              Haustür
            </p>
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-white text-green-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition transform hover:scale-105 shadow-lg"
            >
              Jetzt Baum bestellen
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎄</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Persönliche Auswahl</h3>
            <p className="text-gray-600">
              Wir wählen Ihren Baum persönlich nach Ihren Wünschen aus und
              senden Ihnen vorab ein Foto
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-red-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bequeme Lieferung</h3>
            <p className="text-gray-600">
              Wir liefern direkt zu Ihnen nach Hause – auf Wunsch tragen wir
              auch hoch
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-yellow-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Rundum-Service</h3>
            <p className="text-gray-600">
              Optional stellen wir Ihren Baum professionell auf und entsorgen
              ihn nach Weihnachten
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Unsere Service-Pakete
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Wählen Sie das passende Paket für Ihre Bedürfnisse
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative border-2 rounded-2xl p-8 hover:shadow-2xl transition ${
                pkg.popular ? "border-red-500 shadow-xl" : "border-gray-200"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    BELIEBTESTES PAKET
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-4xl font-bold text-green-600 mb-6">
                {pkg.price}€
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowOrderForm(true)}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  pkg.popular
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Paket wählen
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200 max-w-4xl mx-auto">
          <h4 className="font-bold text-lg mb-2">Zusatzservice</h4>
          <p className="text-gray-700">
            <strong>Abholung & fachgerechte Entsorgung</strong> nach
            Weihnachten:{" "}
            <span className="text-2xl font-bold text-green-600">40€</span>
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Bereit für Ihren perfekten Weihnachtsbaum?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Bestellen Sie jetzt und lehnen Sie sich zurück – wir übernehmen den
            Rest!
          </p>
          <button
            onClick={() => setShowOrderForm(true)}
            className="bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition transform hover:scale-105 shadow-lg"
          >
            Jetzt bestellen
          </button>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Kontakt & Service-Gebiet
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Service-Gebiet</p>
                    <p className="text-gray-600">
                      Ingolstadt + Umgebung (10-20 km)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Telefon</p>
                    <p className="text-gray-600">Auf Anfrage</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">E-Mail</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-green-600 hover:text-green-700"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">So funktioniert's</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Bestellung aufgeben</p>
                    <p className="text-gray-600 text-sm">
                      Teilen Sie uns Ihre Wünsche mit
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Foto-Vorschau</p>
                    <p className="text-gray-600 text-sm">
                      Sie erhalten ein Foto Ihres Baumes
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold">Lieferung & Barzahlung</p>
                    <p className="text-gray-600 text-sm">
                      Wir liefern zum Wunschtermin, Sie zahlen bar
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Weihnachtsbaum-Service Ingolstadt | Frohe Weihnachten! 🎄
          </p>
        </div>
      </div>
    </div>
  );
}
