
# Data layer

## Checklist
Simplified names of subject entities and properties (use the next table for mapping).

Add :white_check_mark: if the entity/property is relevant to the pilot.



| Subject         | Property        | ACCESS | BELLS  | CHILD  | FACETS | INTERLINK | MUSICBO | MEETUPS | ORGANS | TUNES | TONALITIES | EXAMPLE
| -------------- | --------------- | ------ | ------ | ------ | ------ | ------ | ------ |  ------ |  ------ |  ------ |  ------ |  ------ |
| Music work     | type |  |  |  |  |:white_check_mark:  |  |  |  | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Music work     | genre |  |  |  |  | :white_check_mark: |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Music work     | title |  |  |  |  |:white_check_mark: |  |  |  | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Music work     | composer |  |  |  |  |:white_check_mark:  |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Music work     | date |  |  |  |  | :white_check_mark: |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Music work     | source (manuscript) |  |  |  |  |  |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Music work     | place of production |  |  |  |  | :white_check_mark: |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Source (manuscript)    | type |  |  |  |  |  |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Source (manuscript)    | title |  |  |  |  |  |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Source (manuscript)    | place of production |  |  |  |  |  |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Source (manuscript)    | creator |  |  |  |  |  |  |  |  | :white_check_mark: |  | :white_check_mark: |
| Melodic pattern | parent work |  |  |  |  |  |  |   |   | :white_check_mark:  | :white_check_mark: |  |
| Place | name |  |  |  |  |  |  |   |   | :white_check_mark:  |   |  |
| Instrument | type |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Instrument | builder |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Instrument | builder's place |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Instrument | date |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Instrument | place of production |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Instrument | component |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Instrument | material |  |  |  |  |  |  |   | :white_check_mark:  |   |   |  |
| Musical performance | time |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Musical performance | place |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Musical performance | performer |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Musical performance | musical composition |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Musical performance | mediums of performance collection |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Musical composition | composer |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Musical composition | mediums of performance collection |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
| Performer | role |  |  |  |  |:white_check_mark:  | :white_check_mark: |   |   |   |   |  |
| Performer | medium of performance |  |  |  |  |  | :white_check_mark: |   |   |   |   |  |
|  |  |  |  |  |  |  |  |   |   |   |   |  |





## Mapping

If available include the mapping to an ontology term (classes and properties). Include prefixes here:

```
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix mo: <http://purl.org/ontology/mo/> .
```

Add an icon to flag important/secondary/less important ones.

:lion: the king of the dataset

:koala: secondary aspect, but too cute to leave behind

:duck: I don't know if it is important

### EXAMPLE

#### Classes
| priority | Name | term | desc |
| --- | --- | --- | --- |
| :lion: | Music Work | `mo:MusicWork` | |

#### Properties
| priority | Name | term | desc |
| --- | --- | --- | --- |
|:lion: | title | `dcterms:title` | represents the title of any type of work (not only music works) |

### ACCESS
#### Classes
#### Properties

### BELLS  
#### Classes
#### Properties

### CHILD
#### Classes
#### Properties

### FACETS
#### Classes
#### Properties

### INTERLINK
#### Classes
#### Properties

### MUSICBO

see: [Carolina story maninpasta design](https://github.com/polifonia-project/stories/issues/14)


#### Classes

| status | priority | Name | term | desc |
| --- | --- | --- | --- | --- |
| draft | :lion: | Musical performance | `:TimeIndexedMusicalPerformance` | |
| draft | :lion: | Performer | `:Performer` | |
| draft | :lion: | Medium of performance | `:MediumOfPerformance` | |
| draft | :lion: | Mediums of performance collection | `:MediumsOfPerformanceCollection` | |
| draft | :lion: | Musical composition  | `:MusicalComposition` | |


#### Properties

| status | priority | Name | term | desc |
| --- | --- | --- | --- | --- |
| draft |:lion: | has instrument player | `:hasInstrumentPlayer` | domain Musical performance |
| draft |:lion: | has singer | `:hasSinger` | domain Musical performance |
| draft |:lion: | has piano player | `:hasPianoPlayer` | domain Musical performance |
| draft |:lion: | has composer | `:hasComposer` | domain Musical composition |


### MEETUPS
#### Classes
#### Properties

### ORGANS

Objectives: Identify relations between organs builders and countries

 * Evolution of builders' provenance in NL (e.g. German builders replacing Dutch)
 * Influence of builders / types of organs production in other countries (Indian tradition spread in NL)
 * Changes of materials over time and space

#### Classes
#### Properties

### TUNES

Objective: Identify relations between traditions of different countries and/or periods.

 * Trends and distribution of melodies over time.
 * Networks of melodies across countries (based on similarity). 
 * (wish) Evolution curve of music complexity (based on a work of C. Weiss)

#### Classes
#### Properties

### TONALITIES

see: https://github.com/Amleth/source-sherlockizer-service

#### Classes

| status | priority | Name | term | desc |
| --- | --- | --- | --- | --- |
| draft | :lion: | Music Work | `lrmoo:F1_Work` | |
| draft | :lion: | Score content (in symbolic notation) | `lrmoo:F2_Expression` | |
| draft | :lion: | Score Offset | `crm:E90_Symbolic_Object` | | 
| draft | :lion: | Note offset | `crm:E90_Symbolic_Object` | | 
| draft | :lion: | Arbitrary set of notes  | `crm:E90_Symbolic_Object` | | 
| draft | :lion: | Annotation | `crm:E13_Attribute_Assignment` | |
| draft | :lion: | Concept | `crm:E55_Type` | |

#### Properties
