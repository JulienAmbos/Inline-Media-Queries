# Einleitung
Dieses Projekt ist die Ausarbeitung für die Hausarbeit im Modul **Praxis der Softwareentwicklung**. Dieses Projekt deckt die Ziele der Hausarbeit ab, eine funktionsfähige Simulation eines
Help Desks zu erstellen und im Anschluss die durchschnittliche Dauer der Bearbeitung eines Service Requests im Service Level 2 zu berechnen
(Es wird angenommen, dass mit "durchschnittliche Servicedauer" die Wartezeit zwischen den Service Level ausgeschlossen ist).

Zusätzlich zu finden ist das dazugehörige UML-Diagramm, welches im Hauptordner liegt.

Dieses Dokument richtet sich an Leser, die grundsätzlich mit der Aufgabenstellung vertraut sind.

In der folgenden Dokumentation wird auf die Funktion und die Erweiterbarkeit der einzelnen Klassen eingegangen.

Ausgeschlossen von der Bewertung ist die Klasse "XmlValidation", die zu Überprüfungszwecken erstellt wurde.

# Genereller Ablauf der Simulation

Das Objekt "RequestSource" erstellt, anhand von Eingangszeiten, die durch eine Verteilungsfunktion festgelegt werden, Events, und übergibt diese an die Timeline.
Die Timeline führt die `execute()` Methode jedes einzelnen Events aus. Aus Events können Service Requests entstehen, die ein Erstelldatum haben.
Service Requests werden an Vearbeitungsstationen gegeben, die die Verarbeitung und die Zeitberechnung mit Hilfe von Verarbeitungsschritten übernehmen.
Bei Abschluss eines Service Requests wird dieser an das Objekt "XmlLogger" übergeben, welches aktzeptierte Service Requests für ein späteres Schreiben eines
Protokolls vorbereitet. Nach Abarbeitung aller Service Requests, wird die Funktion `writeXmlToDisk()` aufgerufen, welche alle eingegangenen Service Requests und weitere Informationen
in ein Xml-Dokument schreibt und im Projektordner abspeichert.

# Main
Die Aufgabe der Klasse Main ist ein Szenario aufzurufen um eine Simulation zu starten und eine Auswertung über das geschrieben Protokoll auszugeben.

```java
File file = createProtokollFile();
```
Mit dem Aufruf zu `createProtokollFile()` wird für **ein Szenario** eine Datei vorgehalten, in die mit den folgenden Code-Zeilen letzendlich das Protokoll geschrieben wird und eine 
Auswertung geschieht, z.B.:

```java
new BeispielSzenario1(file).run();
new XmlValidation(2, file).run();
```
Für jede Simulation müssen die drei genannten Code-Zeilen ausgeführt werden. Falls also eine zweite Simulation stattfinden soll, werden z.B. folgende Code-Zeilen benötigt:

```java
File file2 = createProtokollFile();
new BeispielSzenario2(file2).run();
new XmlValidation(2, file2).run();
```

Um eine Simulation auszuführen muss die Funktion `run()` von einem Objekt vom Oberklassen-Typ "Szenario" aufgerufen werden. Als Übergabe Parameter des Konstruktors muss 
ein Objekt vom Typ File übergeben werden, in das letzendlich ein Protokoll geschrieben wird, z.B.:

```java
new BeispielSzenario1(file).run();
```

Um eine Auswertung über das geschriebene Protokoll auszuführen, muss die Funktion `run()` von einem Objekt vom Typ "XmlValidation" aufgerufen werden. Als Übergabe Parameter
des Konstruktors wird ein `Integer serviceLevel` benötigt, der über das angebene Service Level zusätzliche Auswertungen fährt, sowie die Protokolldatei vom Typ "File".

```java
new XmlValidation(2, file).run();
```

# Szenario, ISzenario und BeispielSzenario1

Um ein neues Szenario (einen neuen Tag der Simulation) zu erstellen, muss eine neue Klasse vom Oberklassen-Typ "Szenario" und vom Interface "ISzenario" angelegt werden.
Als Beispiel dient die bereits vorhandene Klasse "BeispielSzenario1", mit deren Hilfe erklärt wird, wie ein neues Szenario angelegt werden kann.

## Ein neues Szenario

### Funktionsweise und detaillierterer Ablauf

Die Abarbeitung eines Szenarios erfolgt durch drei Methodenaufrufe:

```java
this.requestSource.init();
this.timeline.run();
this.xmlLogger.writeXmlToDisk();
```

Die erste Zeile Code ruft die Methode `init()` von dem Objekt "RequestSource" auf, welche nach einer im Konstruktor des Szenarios zugewiesenen Verteilungsfunktion
die Ankunfszeiten von neuen Events ermittelt, neue Events erstellt und diese der Timeline zuweist.

Die zweite Zeile Code ruft die Methode `run()` von dem Objekt "Timeline" auf, welche die Funktion "execute" von jedem Objekt vom Typ "Event" aufruft.

Die dritte Zeile Code ruft die Methode `writeXmlToDisk()` von dem Objekt "XmlLogger" auf, welche nach Abarbeitung aller Events ein Protokoll über die Simulation schreibt.

Damit das Objekt "RequestSource" arbeiten kann, benötigt es ein Objekt vom Typ "Timeline" und ein Objekt vom Interface-Typ "IRequestTimer" (eine Verteilungsfunktion).
Zudem benötigt das Objekt "RequestSource" einen Successor vom Typ "Processing", der eine erste Auffangstation für Service Requests darstellt. In der Funktion `init()` des Objektes wird den 
erstellten Events diese erste Auffangstation übermittelt, indem die `execute()` Funktion des Events überschrieben wird. Über die Funktion `accept()` des Objekts vom Typ "Proccessing" 
wird ein Service Request an eine Verarbeitungsstation übergeben. Diese Verarbeitungsstation benötigt die Instanz des Xml Loggers und verarbeitet, abhängig von übergebenen Verarbeitungsschritt-Objekten vom Typ "VearbeitungsSchritt", den ServiceRequest.
Verarbeitungsschritte setzen den Status des Tickets, berechnen Bearbeitungszeiten und schreiben diese Bearbeitungszeiten als einzelne Bearbeitungszeit-Objekte vom Typ "StringIntegerTupel" in den Service Request zurück.
Nachdem das Ticket abgeschlossen wurde, wird dieses an das Objekt vom Typ "XmlLogger" übergeben, in dem eine Auswertung der Objekte vom Typ "StringIntegerTupel" stattfindet, die die Informationen in XML-Format übersetzt.
Nach Abarbeitung aller ServiceRequests schreibt der Xml Logger das Protokoll auf die Festplatte.

Diese Zusammenhänge können mit nur wenigen Zeilen Code erweitert werden. In den folgendenen Unterkapiteln wird auf diese Erweiterungsmöglichkeiten eingegangen.

### Zuweisungen im Konstruktor

Im Konstruktor des Szenarios finden allerlei Zuweisungen statt, die die Relationen zwischen den Simulationsobjekten und die Simulationsobjekte an sich festlegen.

#### XmlLogger

Zuerst wird eine Instanz vom Typ "XmlLogger" erstellt:

```java
this.xmlLogger = new XmlLogger(file);
```

#### Festlegung von Parametern

Danach erfolgt eine Festlegung von Parametern der Simulation, z.B.:

```java
int mittlereBearbeitungszeitLevel1 = 5 * 60; // in Sekunden
int mittlereBearbeitungszeitLevel2 = 10 * 60; // in Sekunden
int ankunftsratePoissionTimer = 60; // pro Stunde
int mitarbeiterInLevel1 = 7;
int mitarbeiterInLevel2 = 4;
int nameVonServiceLevel1 = 1;
int nameVonServiceLevel2 = 2;
int dauerEinesTages = 8 * 60 * 60; // in Sekunden
```

#### Verarbeitungsstationen mit Verarbeitungsschritten und Verteilungsfunktionen

Vearbeitungsstationen haben eine Liste von VerarbeitungsSchritt-Objekten vom Typ "VerarbeitungsSchritt". Ein Verarbeitungsschritt erbt die Methode `execute()` von der Oberklasse "VerarbeitungsSchritt", 
die ein Service Request als Parameter erhalten muss. Ein Verarbeitungsschritt kann den Status des Service Requests setzen, Bearbeitungszeiten berechnen und diese an 
den Service Request in Form eines Objektes vom Typ "StringIntegerTupel" zurückgeben. 
Ein "StringIntegerTupel" enthält zwei Felder, Key vom Typ `String` und Value vom Typ `Integer`. Auch wenn bei jedem beliebigen übergebenen String als Key das Schreiben
des Protokolls funktioniert, werden für die nachträgliche Auswertung (die jedoch außerhalb des Hausarbeiten-Scopes ist) bestimmte Key-Namenskonventionen benötigt:

- ExecutionDuration (Dauer eines Vearbeitungsschrittes)
- WaitingTime (Wartezeit auf einen freien Mitarbeiter Slot)
- ServiceLevel (Angabe des aktuellen ServiceLevels)

Zuerst wird eine ArrayList vom Typ "VerarbeitungsSchritt" erstellt, der anschließend Vearbeitungsschritte zugewiesen werden. Entweder kann ein vorhandener Verarbeitungsschritt benutzt werden oder eine anonymen inneren Klasse:

```java
ArrayList<VerarbeitungsSchritt> VearbeitungsSchritteLevel1 = 
    new ArrayList<VerarbeitungsSchritt>();

VearbeitungsSchritteLevel1.add(new AufnahmeDerGrunddaten()); // Angabe eines vorhandenen Objektes vom Oberklassen-Typ "VerarbeitungsSchritt"

VearbeitungsSchritteLevel1.add(new VerarbeitungsSchritt() {
    @Override 
    public void execute(ServiceRequest any) {
        // Vearbeite den übergebenen ServiceRequest
    }
}); // Angabe einer anonymen inneren Klasse, in der die execute Methode überschrieben wird
```

Verarbeitungsschritte können auf Verteilungsfunktionen zur Berechnung von Bearbeitungszeiten zugreifen.
Entweder wird ein vorhandenes Objekt vom Oberklassen-Typ "Verteilung" benutzt, oder eine anonyme innere Klasse:

```java
Integer bearbeitungsZeit = 
    new Exponentialverteilung(this.mittlereBearbeitungszeit).verteile(); // Angabe eines vorhandenen Objektes vom Oberklassen-Typ "Verteilung"
    
Integer bearbeitungsZeit = new Verteilung() {
    @Override
    public int verteile() {
        return 5;
    }
} // Angabe einer anonymen inneren Klasse, in der die verteile() Methode überschrieben wird
```

Damit die Simulation Service Requests als "Abgeschlossen" ansieht, muss in mindestens einem Verarbeitungsschritt der Status des Service Requests auf abgeschlossen werden, indem die Methode `setIsClosed(Boolean isClosed)` aufgerufen wird (Es kann auch das bereits vorhandene Objekt "ServiceRequestSchliessen" vom Typ "VerarbeitungsSchritt" verwendet werden): 

```java
any.setIsClosed(true);
```

Diese Liste mit Verarbeitungsschritten wird einem Objekt vom Typ "Processing" zugewiesen, die zusätzlich die Instanz vom XmlLogger erhält und
eine Anzahl an Mitarbeiter mit dem Typ `Integer`, z.B.:

```java
Processing serviceStation1 = 
    new Processing(mitarbeiterInLevel1, VearbeitungsSchritteLevel1, xmlLogger); 
```

Es können einer Verarbeitungsstation weitere Verarbeitungsstationen hinzugefügt werden, an die Service Requests weitergereicht werden können.
Eine Verarbeitungsstation kann mit folgendem Code hinzugefügt werden (wobei dann eine weitere Instanz von dem Objekt "Processing" benötigt wird, hier 
als Beispiel mit dem Namen "serviceStation2"):

```java
serviceStation1.addSuccessor(serviceStation2); 
```

ServiceRequest können an einen Successor weitergereicht werden, in dem in einem Vearbeitungsschritt die Exception "CanNotProcessException" geworfen wird.

```java
throw new CanNotProcessException();
```

### Verteilungsfunktion zur Ermittlung der Ankunfszeiten von Events

Zur Ermittlung der Ankunftszeiten von Events wird eine Verteilungsfunktion benötigt die vom Interface-Typ "IRequestTimer" ist. Die Funktion `nextRequestTime()`
muss dabei implementiert werden, die einen Integer zurück gibt, der eine Zeit darstellt, z.B.:

```java
IRequestTimer requestTimer = new Poisson(ankunftsratePoissionTimer, dauerEinesTages);
```

### RequestSource

Abschließend wird einem Objekt von Typ "RequestSource" die Timeline und die Verteilungsfunktion zur Ermittlung der Ankunftszeiten von Events übergeben:
Zusätzlich wird dieser Request Source ein Successor vom Typ "Processing" zugewiesen, damit die daraus resultierenden Events die Auffangstation kennen:

```java
this.requestSource = new RequestSource(timeline, requestTimer);
requestSource.addSuccessor(serviceStation1);
```

### Zusätzliche Informationen in das Protokoll schreiben

Falls zusätzliche Angaben wie z.B. die Anzahl Levels oder die Anzahl Mitarbeiter pro Level in das Protokoll übernommen werden sollen, kann mit 
der Funktion `writeXmlToBuilder(String xml)` des Objektes "XmlLogger" XML geschrieben werden, z.B.:

```java
xmlLogger.writeXmlToBuilder("<Level><Name>1</Name><Employees>4</Employees></Level>");
```

# Schluss

## Quellen

- Zimmermann, Frank (Fork des Git-Projektes Zimmermann_Simulation)
- Mockito (mockito-all-1.9.5.jar)
- Commons.Math (common-math3-3.2.jar)

## Auswertung

Sie finden die Beantwortung der Aufgabenstellung "Ermitteln Sie jedoch in
dem Beispielszenario die durchschnittliche Servicedauer in Level 2" finden sie entweder
ausgedruckt oder in der Datei: Beispielauswertung.txt, die im Git-Projekt enhalten ist.
