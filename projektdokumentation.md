# Projekt-Dokumentation

Joël Haldimann, Jan Frey, Damian Eisenring, Plauder Pinguin Macher

| Datum | Version | Zusammenfassung                                              |
| ----- | ------- | ------------------------------------------------------------ |
|   10.01    | 0.0.1   | Wir haben das Projekt zusammen geplant |
|     17.01  | 0.0.2     |Jedes Gruppenmitglied hat sich zu seinen Aufgaben informiert.|
|     24.01  | 0.1.0   |Wir unsere Fortschritte verglichen und an unseren Aufträgen gearbeitet.|
|14.02|0.1.0|Wir haben unsere Projekte zusammengefügt.|

## 1 Informieren

### 1.1 Ihr Projekt

Wir haben eine Chat-Api mit minimalistischen Frontend erstellt.

### 1.2 User Stories

| US-№ | Verbindlichkeit | Typ  | Beschreibung                                             |
| ---- | --------------- | ---- | -------------------------------------------------------- |
| 1    | Muss            | Funktional  | Als ein Benutzer möchte ich mich in den Chat einloggen können, um an Unterhaltungen teilzunehmen. |
| 2    | Muss            | Funktional  | Als ein Benutzer möchte ich Nachrichten an andere Benutzer senden können. |
| 3    | Muss            | Funktional  | Als ein Benutzer möchte ich Nachrichten von anderen Benutzern empfangen können. |
| 4    | Soll            | Qualität  | Als ein Benutzer möchte ich in der Lage sein, Nachrichten zu löschen, um meine Chat-Historie zu verwalten. |
| 5    | Muss            | Funktional  | Als ein Benutzer möchte meiner bisherigen Unterhaltungen abrufen können. |


### 1.3 Testfälle

| TC-№ | Ausgangslage                    | Eingabe | Erwartete Ausgabe                                      |
| ---- | ------------------------------- | ------- | ------------------------------------------------------ |
| 1.1  | Benutzer ist nicht im Chat      | Login   | Erfolgreicher Login, Benutzer ist im Chat angemeldet.   |
| 2.1  | Nachricht senden                | Text    | Nachricht wird gesendet und ist im Chat sichtbar.       |
| 3.1  | Nachricht empfangen             |         | Neue Nachricht wird im Chat angezeigt.                  |
| 4.1  | Nachricht löschen               | Nachricht-ID | Nachricht wird aus der Chat-Historie gelöscht.        |
| 5.1  | Chats aufrufen  | Benutzer | Chat des Benutzers    |

## 2 Planen

| AP-№ | Frist | Zuständig | Beschreibung | geplante Zeit |
| ---- | ----- | --------- | ------------ | ------------- |
|1.A|24.1|Jan Frey|Login| 8 AP|
|2.A|14.02|Damian Eisenring|Nachrichten senden| 10 AP|
|3.A|14.02|Joël Haldimann|Nachrichten empfangen|10 AP|
|4.A|21.02|Damian Eisenring|Nachrichten löschen|5 AP|
|5.A|21.02|Jan Frey|Bisherige Unterhaltungen abrufen |5 AP|

Total:35 AP
## 3 Entscheiden
Wir haben uns entschieden alle Funktionalen anforderungen zu erfüllen, und falls es die Zeit zulässt an den Qualität und Optinalen Bedinungen zu arbeiten.

## 4 Realisieren

| AP-№ | Datum | Zuständig | geplante Zeit | tatsächliche Zeit |
| ---- | ----- | --------- | ------------- | ----------------- |
|1.A|24.01|Jan Frey|8 AP|8 AP|
|2.A|14.02|Damian Eisenring|10 AP|11 AP|
|3.A|14.02|Joël Haldimann|10 AP|10 AP|
|4.A|21.02|Joël Haldimann|-|-|
|5.A|21.02|Jan Frey|5 AP|4 AP|

## 5 Kontrollieren

### 5.1 Testprotokoll

| TC-№ | Datum | Resultat | Tester |
| ---- | ----- | -------- | ------ |
| 1.1  | 21.02.2024 | OK | Joël Simon Juan Haldimann |
| 2.1  | 21.02.2024 | OK | Joël Simon Juan Haldimann       |
| 3.1  | 21.02.2024 | OK | Joël Simon Juan Haldimann       |
| 4.1  | 21.02.2024 | NOK | Joël Simon Juan Haldimann       |
| 5.1  | 21.02.2024 | OK | Joël Simon Juan Haldimann       |

