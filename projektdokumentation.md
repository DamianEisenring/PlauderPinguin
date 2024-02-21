# Projekt-Dokumentation

Joël Haldimann, Jan Frey, Damian Eisenring, Plauder Pinguin Macher

| Datum | Version | Zusammenfassung                                              |
| ----- | ------- | ------------------------------------------------------------ |
|       | 0.0.1   | ✍️ Jedes Mal, wenn Sie an dem Projekt arbeiten, fügen Sie hier eine neue Zeile ein und beschreiben in *einem* Satz, was Sie erreicht haben. |
|       | ...     |                                                              |
|       | 1.0.0   |                                                              |

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


### 1.4 Diagramme

✍️Fügen Sie hier ein Use Case-Diagramm mit mindestens 10 Anwendungsfällen ein; und einen PAP.

## 2 Planen

| AP-№ | Frist | Zuständig | Beschreibung | geplante Zeit |
| ---- | ----- | --------- | ------------ | ------------- |
| 1.A  |       |           |              |               |
| ...  |       |           |              |               |

Total: 

✍️ Die Nummer hat das Format `N.m`, wobei `N` die Nummer der User Story ist, auf die sich das Arbeitspaket bezieht, und `m` von `A` an nach oben buchstabiert. Beispiel: Das dritte Arbeitspaket, das die zweite User Story betrifft, hat also die Nummer `2.C`.

✍️ Ein Arbeitspaket sollte etwa 45' für eine Person in Anspruch nehmen. Die totale Anzahl Arbeitspakete sollte etwa Folgendem entsprechen: `Anzahl R-Sitzungen` ╳ `Anzahl Gruppenmitglieder` ╳ `4`. Wenn Sie also zu dritt an einem Projekt arbeiten, für welches zwei R-Sitzungen geplant sind, sollten Sie auf `2` ╳ `3` ╳`4` = `24` Arbeitspakete kommen. Sollten Sie merken, dass Sie hier nicht genügend Arbeitspakte haben, denken Sie sich weitere "Kann"-User Stories für Kapitel 1.2 aus.

## 3 Entscheiden

✍️ Dokumentieren Sie hier Ihre Entscheidungen und Annahmen, die Sie im Bezug auf Ihre User Stories und die Implementierung getroffen haben.

## 4 Realisieren

| AP-№ | Datum | Zuständig | geplante Zeit | tatsächliche Zeit |
| ---- | ----- | --------- | ------------- | ----------------- |
| 1.A  |       |           |               |                   |
| ...  |       |           |               |                   |

✍️ Tragen Sie jedes Mal, wenn Sie ein Arbeitspaket abschließen, hier ein, wie lang Sie effektiv dafür hatten.

## 5 Kontrollieren

### 5.1 Testprotokoll

| TC-№ | Datum | Resultat | Tester |
| ---- | ----- | -------- | ------ |
| 1.1  |       |          |        |
| ...  |       |          |        |

✍️ Vergessen Sie nicht, ein Fazit hinzuzufügen, welches das Test-Ergebnis einordnet.

### 5.2 Exploratives Testen

| BR-№ | Ausgangslage | Eingabe | Erwartete Ausgabe | Tatsächliche Ausgabe |
| ---- | ------------ | ------- | ----------------- | -------------------- |
| I    |              |         |                   |                      |
| ...  |              |         |                   |                      |

✍️ Verwenden Sie römische Ziffern für Ihre Bug Reports, also I, II, III, IV etc.

## 6 Auswerten

✍️ Fügen Sie hier eine Verknüpfung zu Ihrem Lern-Bericht ein.
