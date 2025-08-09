import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

const PrivacyPolicyPage: React.FC = () => {
  const { openModal } = useConsultationModal();

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0A1A2F' }}>
      {/* Header */}
      <section className="py-20" style={{ backgroundColor: '#0A1A2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto" style={{ color: '#0A1A2F' }}>
  <h1 className="text-3xl font-bold mb-6">Polityka prywatności Serwisu uwolnieniekredytowe</h1>
  <p className="text-lg mb-4">uwolnieniekredytowe.pl („Serwis”)</p>

  <p className="text-lg mb-4">
    Drogi Użytkowniku!<br />
    Dbamy o Twoją prywatność i chcemy, abyś w czasie korzystania z naszych usług czuł się komfortowo.
    Dlatego też poniżej prezentujemy Ci najważniejsze informacje o zasadach przetwarzania przez nas
    Twoich danych osobowych oraz plikach cookies, które są wykorzystywane przez nasz Serwis. Informacje
    te zostały przygotowane z uwzględnieniem RODO, czyli ogólnego rozporządzenia o ochronie danych.
  </p>

  <h2 className="text-2xl font-bold mb-4">ADMINISTRATOR DANYCH OSOBOWYCH</h2>
  <p className="text-lg mb-4">
    Krzysztof Milewski; Ogrody Bielawy 6, 05-520 Bielawa.<br />
    Jeśli chcesz skontaktować się z nami w związku z przetwarzaniem przez nas Twoich danych osobowych,
    napisz do nas na adres e-mail: <a href="mailto:kontaktuwolnieniekredytowe@gmail.com" className="underline" style={{ color: '#0A1A2F' }}>kontaktuwolnieniekredytowe@gmail.com</a>.
  </p>

  <h2 className="text-2xl font-bold mb-4">TWOJE UPRAWNIENIA</h2>
  <p className="text-lg mb-4">Przysługuje Ci prawo żądania:</p>
  <ul className="list-disc pl-6 mb-4 space-y-2">
    <li>dostępu do Twoich danych osobowych, w tym uzyskania kopii Twoich danych (art. 15 RODO lub - jeśli ma to zastosowanie - art. 13 ust. 1 lit. f RODO),</li>
    <li>ich sprostowania (art. 16 RODO), usunięcia (art. 17 RODO),</li>
    <li>ograniczenia przetwarzania (art. 18 RODO),</li>
    <li>przeniesienia danych do innego administratora (art. 20 RODO).</li>
  </ul>
  <p className="text-lg mb-4">A także prawo:</p>
  <ul className="list-disc pl-6 mb-4 space-y-2">
    <li>
      wniesienia w dowolnym momencie sprzeciwu wobec przetwarzania Twoich danych:
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>z przyczyn związanych z Twoją szczególną sytuacją – wobec przetwarzania dotyczących Ciebie danych osobowych, opartego na art. 6 ust. 1 lit. f RODO (tj. na realizowanych przez nas prawnie uzasadnionych interesach) (art. 21 ust. 1 RODO);</li>
        <li>jeżeli dane osobowe są przetwarzane na potrzeby marketingu bezpośredniego, w zakresie, w jakim przetwarzanie jest związane z takim marketingiem bezpośrednim (art. 21 ust. 2 RODO).</li>
      </ul>
    </li>
  </ul>
  <p className="text-lg mb-4">
    Skontaktuj się z nami, jeśli chcesz skorzystać ze swoich praw. Sprzeciw w odniesieniu do
    wykorzystywania przez nas plików cookies (o których przeczytasz poniżej) możesz wyrazić zwłaszcza
    za pomocą odpowiednich ustawień przeglądarki.
  </p>
  <p className="text-lg mb-4">
    Jeśli uznasz, że Twoje dane są przetwarzane niezgodnie z prawem, możesz złożyć skargę do Prezesa
    Urzędu Ochrony Danych Osobowych.
  </p>

  <h2 className="text-2xl font-bold mb-4">DANE OSOBOWE I PRYWATNOŚĆ</h2>
  <p className="text-lg mb-4">
    Poniżej znajdziesz szczegółowe informacje na temat przetwarzania Twoich danych w zależności od
    podejmowanych przez Ciebie działań.
  </p>

  {/* Section 1: Skorzystanie z płatnych usług */}
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-2">1. Skorzystanie z płatnych usług oferowanych w Serwisie</h3>
    <p className="font-semibold mt-4 mb-2">W jakim celu?</p>
    <p className="text-lg mb-4">realizacja umowy o świadczenie usług oferowanych w Serwisie</p>

    <p className="font-semibold mt-4 mb-2">Na jakiej podstawie?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>umowa o świadczenie usług (art. 6 ust. 1 lit. b RODO)</li>
      <li>obowiązek prawny, w szczególności związany z rachunkowością, zobowiązujący nas do przetwarzania Twoich danych osobowych (art. 6 ust. 1 lit. c RODO)</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Jak długo?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>przez okres obowiązywania umowy</li>
      <li>do momentu wygaśnięcia ciążących na nas obowiązków prawnych</li>
      <li>ponadto, Twoje dane będą przetwarzane do upływu okresu, w którym możliwe jest dochodzenie roszczeń – przez Ciebie lub przez nas (więcej informacji na ten temat znajdziesz w ostatniej tabeli tej sekcji)</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Co się stanie, jeśli nie podasz danych?</p>
    <p className="text-lg mb-4">nie będziesz mieć możliwości skorzystania z naszych usług</p>
  </div>

  {/* Section 2: Nawiązanie z nami kontaktu */}
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-2">2. Nawiązanie z nami kontaktu (np. w celu zadania pytania)</h3>
    <p className="font-semibold mt-4 mb-2">W jakim celu?</p>
    <p className="text-lg mb-4">obsługa Twoich zapytań lub zgłoszeń</p>

    <p className="font-semibold mt-4 mb-2">Na jakiej podstawie?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>umowa lub działania podejmowane na Twoje żądanie, zmierzające do jej zawarcia (art. 6 ust. 1 lit. b RODO) – w przypadku gdy Twoje zapytanie lub zgłoszenie dotyczy umowy, której jesteśmy lub możemy być stroną</li>
      <li>nasz prawnie uzasadniony interes, polegający na przetwarzaniu Twoich danych w celu prowadzenia z Tobą komunikacji (art. 6 ust. 1 lit. f RODO) – jeżeli Twoje zapytanie lub zgłoszenie nie ma związku z umową</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Jak długo?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>przez czas trwania wiążącej nas umowy lub – jeśli umowa nie zostanie zawarta - do upływu okresu dochodzenia roszczeń – zobacz ostatnią tabelę tej sekcji*</li>
      <li>do upływu okresu dochodzenia roszczeń – zobacz ostatnią tabelę tej sekcji - lub do momentu, w którym uwzględnimy Twój sprzeciw wobec przetwarzania*</li>
      <li>ponadto, Twoje dane będą przetwarzane do upływu okresu, w którym możliwe jest dochodzenie roszczeń – przez Ciebie lub przez nas (więcej informacji na ten temat znajdziesz w ostatniej tabeli tej sekcji)</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Co się stanie, jeśli nie podasz danych?</p>
    <p className="text-lg mb-4">nie będziemy mieli możliwości udzielenia odpowiedzi na Twoje zapytanie lub zgłoszenie<br />* w zależności od tego, które ma zastosowanie w danym przypadku</p>
  </div>

  {/* Section 3: Wyrażenie przez Ciebie zgody na otrzymywanie od nas treści marketingowych */}
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-2">3. Wyrażenie przez Ciebie zgody na otrzymywanie od nas treści marketingowych (np. informacji o ofertach specjalnych)</h3>
    <p className="font-semibold mt-4 mb-2">W jakim celu?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>wysyłka informacji marketingowych, zwłaszcza ofert specjalnych</li>
      <li>analiza efektywności wysłanych przez nas wiadomości, celem ustalenia ogólnych zasad dotyczących skutecznej wysyłki wiadomości w naszej działalności (więcej na ten temat przeczytasz w sekcji „Działania analityczne” Polityki prywatności)</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Na jakiej podstawie?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>Twoja zgoda na nasze działania marketingowe (art. 6 ust. 1 lit. a RODO)</li>
      <li>nasz prawnie uzasadniony interes, polegający na przetwarzaniu danych w podanym wyżej celu (art. 6 ust. 1 lit. f RODO)</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Jak długo?</p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>do momentu wycofania przez Ciebie zgody – pamiętaj, w każdej chwili możesz wycofać zgodę. Przetwarzanie danych do momentu cofnięcia przez Ciebie zgody pozostaje zgodne z prawem.</li>
      <li>do momentu, w którym uwzględnimy Twój sprzeciw wobec przetwarzania</li>
      <li>ponadto, Twoje dane będą przetwarzane do upływu okresu, w którym możliwe jest dochodzenie roszczeń – przez Ciebie lub przez nas (więcej informacji na ten temat znajdziesz w ostatniej tabeli tej sekcji)</li>
    </ul>

    <p className="font-semibold mt-4 mb-2">Co się stanie, jeśli nie podasz danych?</p>
    <p className="text-lg mb-4">nie będziesz otrzymywać naszych materiałów marketingowych, w tym informacji o naszych ofertach specjalnych</p>
  </div>

  {/* Section 4: Podjęcie działania lub zaniechanie mogące powodować powstanie roszczeń */}
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-2">4. Podjęcie działania lub zaniechanie mogące powodować powstanie roszczeń związanych z Serwisem lub naszymi usługami</h3>
    <p className="font-semibold mt-4 mb-2">W jakim celu?</p>
    <p className="text-lg mb-4">ustalenie, dochodzenie lub obrona ewentualnych roszczeń, związanych z zawartą umową lub świadczonymi usługami</p>

    <p className="font-semibold mt-4 mb-2">Na jakiej podstawie?</p>
    <p className="text-lg mb-4">nasz prawnie uzasadniony interes, polegający na przetwarzaniu danych osobowych we wskazanym powyżej celu (art. 6 ust. 1 lit. f RODO)</p>

    <p className="font-semibold mt-4 mb-2">Jak długo?</p>
    <p className="text-lg mb-4">do upływu okresu przedawnienia roszczeń lub do momentu, w którym uwzględnimy Twój sprzeciw wobec przetwarzania*</p>

    <p className="font-semibold mt-4 mb-2">Co się stanie, jeśli nie podasz danych?</p>
    <p className="text-lg mb-4">brak możliwości ustalenia, dochodzenia lub obrony roszczeń<br />* w zależności od tego, które ma zastosowanie w danym przypadku</p>
  </div>

  <h2 className="text-2xl font-bold mb-4">DZIAŁANIA ANALITYCZNE</h2>
  <p className="text-lg mb-4">
    Jeśli wyrazisz wolę otrzymywania od nas wiadomości marketingowych, możemy dokonywać analizy
    efektywności przeprowadzonej przez nas wysyłki. Przykładowo, możemy sprawdzić, czy i w jaki sposób
    wpłynęła ona na aktywność w naszym Serwisie. Takie działania pomogą nam ustalić ogólne zasady
    dotyczące wysyłki tego typu wiadomości w naszej działalności - np. w zakresie optymalnych godzin
    wysyłki czy sposobu formułowania skutecznych treści.
  </p>

  <h2 className="text-2xl font-bold mb-4">BEZPIECZEŃSTWO DANYCH</h2>
  <p className="text-lg mb-4">
    Przetwarzając Twoje dane osobowe stosujemy środki organizacyjne i techniczne zgodne z właściwymi
    przepisami prawa, w tym stosujemy szyfrowanie połączenia za pomocą certyﬁkatu SSL/TLS.
  </p>

  <h2 className="text-2xl font-bold mb-4">PLIKI COOKIES</h2>
  <p className="text-lg mb-4">
    Nasz Serwis, jak większość witryn internetowych, korzysta z tzw. plików cookies (ciasteczek). Pliki
    te: są zapisywane w pamięci Twojego urządzenia (komputera, telefonu, itd.); nie powodują zmian w
    ustawieniach Twojego urządzenia.
  </p>
  <p className="text-lg mb-4">W tym Serwisie ciasteczka wykorzystywane są w celach: zapamiętywania Twojej sesji</p>

  <p className="text-lg mb-4">
    Aby dowiedzieć się, jak zarządzać plikami cookies, w tym jak wyłączyć ich obsługę w Twojej
    przeglądarce, możesz skorzystać z pliku pomocy Twojej przeglądarki. Z informacjami na ten temat
    możesz zapoznać się wciskając klawisz F1 w przeglądarce. Ponadto odpowiednie wskazówki znajdziesz
    na następujących podstronach, w zależności od przeglądarki, której używasz:
  </p>
  <ul className="list-disc pl-6 mb-4 space-y-2">
    <li>Google Chrome</li>
    <li>Opera</li>
    <li>Safari</li>
    <li>Mozilla Firefox</li>
    <li>Microsoft Edge</li>
  </ul>

  <p className="text-lg mb-4">Poniżej znajdziesz informacje na temat funkcji przetwarzanych przez nas plików cookie oraz ich okresie ważności.</p>

  {/* Cookie Table */}
  <div className="overflow-x-auto mb-8">
    <table className="min-w-full border border-gray-300" style={{ borderColor: '#D4AF37' }}>
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-300 text-left font-semibold" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: '#D4AF37' }}>nazwa pliku cookie</th>
          <th className="py-2 px-4 border-b border-gray-300 text-left font-semibold" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: '#D4AF37' }}>okres ważności pliku cookie</th>
          <th className="py-2 px-4 border-b border-gray-300 text-left font-semibold" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: '#D4AF37' }}>funkcja pliku cookie</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>"_ga"</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>czas trwania sesji</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>sledzenie ruchu w celach statystycznych</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="text-lg mb-4">Korzystając z odpowiednich opcji Twojej przeglądarki, w każdej chwili możesz:</p>
  <ul className="list-disc pl-6 mb-4 space-y-2">
    <li>usunąć pliki cookies,</li>
    <li>blokować wykorzystanie plików cookies w przyszłości.</li>
  </ul>
  <p className="text-lg mb-4">W takich przypadkach nie będziemy ich już dłużej przetwarzać.</p>

  <h2 className="text-2xl font-bold mb-4">USŁUGI ZEWNĘTRZNE / ODBIORCY DANYCH</h2>
  <p className="text-lg mb-4">
    Korzystamy z usług podmiotów zewnętrznych, które wspierają nas w prowadzeniu działalności.
    Powierzamy im do przetwarzania Twoje dane – podmioty te przetwarzają dane wyłącznie na nasze
    udokumentowane polecenie.
  </p>
  <p className="text-lg mb-4">Poniżej znajdziesz listę odbiorców Twoich danych:</p>

  {/* External Services Table */}
  <div className="overflow-x-auto mb-8">
    <table className="min-w-full border border-gray-300" style={{ borderColor: '#D4AF37' }}>
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-300 text-left font-semibold" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: '#D4AF37' }}>DZIAŁANIE</th>
          <th className="py-2 px-4 border-b border-gray-300 text-left font-semibold" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: '#D4AF37' }}>ODBIORCY DANYCH</th>
          <th className="py-2 px-4 border-b border-gray-300 text-left font-semibold" style={{ backgroundColor: '#0A1A2F', color: '#F5F5F5', borderColor: '#D4AF37' }}>PRZEKAZANIE DANYCH POZA UNIĘ EUROPEJSKĄ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>każde działanie w związku z Serwisem</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>podmiot zapewniający nam wsparcie techniczne/IT</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>tak – Stany Zjednoczone Ameryki **</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>skorzystanie z płatnych usług dostępnych w Serwisie</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>dostawca oprogramowania do prowadzenia sprzedaży</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>tak – Stany Zjednoczone Ameryki **</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}></td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>dostawca standardowego oprogramowania biurowego (w tym skrzynki poczty elektronicznej)</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>tak – Stany Zjednoczone Ameryki **</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>nawiązanie z nami kontaktu (np. zadanie pytania)</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>dostawca standardowego oprogramowania biurowego (w tym skrzynki poczty elektronicznej)</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>tak – Stany Zjednoczone Ameryki **</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}></td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>Grupa Kapitałowa Votum</td>
          <td className="py-2 px-4 border-b border-gray-300" style={{ color: '#0A1A2F', borderColor: '#D4AF37' }}>nie ma miejsca</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="text-lg mb-4">A ponadto:</p>
  <ul className="list-disc pl-6 mb-4 space-y-2">
    <li>odpowiednie organy publiczne w zakresie, w jakim jesteśmy zobowiązani do udostępnienia im danych.</li>
  </ul>

  <h2 className="text-2xl font-bold mb-4">PRZEKAZYWANIE DANYCH OSOBOWYCH DO PAŃSTW SPOZA UNII EUROPEJSKIEJ</h2>
  <p className="text-lg mb-4">
    ** W związku z powyższym, Twoje dane osobowe mogą być przetwarzane również przez podmioty spoza
    Unii Europejskiej. Właściwy poziom ochrony Twoich danych, w tym poprzez stosowanie odpowiednich
    zabezpieczeń, zapewnia:
  </p>
  <ul className="list-disc pl-6 mb-4 space-y-2">
    <li>uczestnictwo tych podmiotów w tzw. Data Privacy Framework, a więc programie ustanowionym decyzją wykonawczą Komisji Europejskiej jako zbiór zasad gwarantujących odpowiednią ochronę Twojej prywatności - w przypadku podmiotów ze Stanów Zjednoczonych Ameryki</li>
  </ul>

          </div>
        </div>

        <div className="text-center p-12 rounded-2xl shadow-xl border-4" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
                  Masz pytania dotyczące ochrony danych?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#F5F5F5' }}>
                  Jeśli masz pytania dotyczące przetwarzania Twoich danych osobowych 
                  lub chcesz skorzystać ze swoich praw, skontaktuj się z nami.
                </p>
               <button
                 onClick={openModal}
                  className="inline-block font-bold py-4 px-8 rounded-lg text-lg transition-all hover:-translate-y-2 duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-4"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#D4AF37', color: '#0A1A2F' }}
                >
                  Skontaktuj się z nami
               </button>
              </div>
      </section>

      {/* Main Content */}
      {/* <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          {/* <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              
               // Administrator
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  1. Administrator danych osobowych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Administratorem Twoich danych osobowych jest Krzysztof Milewski, 
                  działający jako agent Votum S.A. Spółka partnerska.
                </p>
                <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                  <p style={{ color: '#F5F5F5' }}>
                    <strong>Dane kontaktowe:</strong><br />
                    Email: krzysztof.milewski@dsa.pl<br />
                    Telefon: +48 601 227 876
                  </p>
                </div>
              </div>

               // Cel przetwarzania
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  2. Cel przetwarzania danych osobowych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Twoje dane osobowe przetwarzamy w następujących celach:
                </p>
                <ul className="space-y-3 text-lg" style={{ color: '#0A1A2F' }}>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Udzielenie bezpłatnej konsultacji prawnej</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Analiza dokumentów kredytowych</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Reprezentacja prawna w postępowaniu sądowym</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Kontakt w sprawie prowadzonej sprawy</span>
                  </li>
                </ul>
              </div>

              // Podstawa prawna
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  3. Podstawa prawna przetwarzania
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Podstawą prawną przetwarzania Twoich danych osobowych jest:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#F5F5F5' }}>Zgoda (art. 6 ust. 1 lit. a RODO)</h3>
                    <p style={{ color: '#F5F5F5' }}>
                      Dla celów marketingowych i kontaktu w sprawie usług prawnych
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#F5F5F5' }}>Prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO)</h3>
                    <p style={{ color: '#F5F5F5' }}>
                      Dla celów świadczenia usług prawnych i reprezentacji procesowej
                    </p>
                  </div>
                </div>
              </div>

              // Okres przechowywania
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  4. Okres przechowywania danych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Twoje dane osobowe będą przechowywane przez okres niezbędny do:
                </p>
                <ul className="space-y-3 text-lg" style={{ color: '#0A1A2F' }}>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Realizacji celów, w których zostały zebrane</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Wypełnienia obowiązków prawnych (np. archiwizacja dokumentacji)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Przedawnienia roszczeń wynikających z prowadzonej sprawy</span>
                  </li>
                </ul>
              </div>

              // Prawa osoby
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  5. Twoje prawa
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#0A1A2F' }}>
                  W związku z przetwarzaniem Twoich danych osobowych przysługują Ci następujące prawa:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo dostępu</h3>
                    <p style={{ color: '#F5F5F5' }}>Do swoich danych osobowych</p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo sprostowania</h3>
                    <p style={{ color: '#F5F5F5' }}>Nieprawidłowych danych</p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo usunięcia</h3>
                    <p style={{ color: '#F5F5F5' }}>Danych osobowych</p>
                  </div>
                  <div className="p-6 rounded-xl border-2" style={{ backgroundColor: '#0A1A2F', borderColor: '#D4AF37' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F5F5' }}>Prawo ograniczenia</h3>
                    <p style={{ color: '#F5F5F5' }}>Przetwarzania danych</p>
                  </div>
                </div>
              </div>

              // Bezpieczeństwo
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A1A2F' }}>
                  6. Bezpieczeństwo danych
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#0A1A2F' }}>
                  Stosujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia 
                  bezpieczeństwa Twoich danych osobowych, w tym:
                </p>
                <ul className="space-y-3 text-lg" style={{ color: '#0A1A2F' }}>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Szyfrowanie danych podczas transmisji</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Ograniczenie dostępu do danych osobowych</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Regularne kopie zapasowe</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                    <span>Monitoring bezpieczeństwa systemów</span>
                  </li>
                </ul>
              </div> */}

              {/* Kontakt */}
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;