# CNP (Cod Numeric Personal) Specification

## 1. Legal Framework

| Source | Description |
|--------|-------------|
| **OUG 97/2005, Article 6** | Establishes the legal requirement for a unique numeric personal identifier (CNP) for every Romanian citizen. |
| **HG 1375/2006, Article 14** | Defines the structure, format, and assignment rules of the CNP. Official technical specification. |
| **HG 1375/2006, Article 15** | Defines when a new CNP is assigned (birth record rectification, sex change, error correction, etc.). |

**Official source retrieval:** `legislatie.just.ro` — Normele metodologice de aplicare a OUG 97/2005.

---

## 2. CNP Structure

A CNP is exactly **13 digits**, format:

```
SAALLZZJJNNNC
```

Where:

| Position | Component | Length | Description |
|----------|-----------|--------|-------------|
| 1 | S | 1 | Sex and century code |
| 2-3 | AA | 2 | Last two digits of birth year |
| 4-5 | LL | 2 | Birth month (01-12) |
| 6-7 | ZZ | 2 | Birth day (01-31, calendar-valid) |
| 8-9 | JJ | 2 | County or sector code |
| 10-12 | NNN | 3 | Serial number (001-999) |
| 13 | C | 1 | Control digit (checksum) |

**Source:** HG 1375/2006, Art. 14(3). Official.

---

## 3. Component S — Sex and Century

### Exhaustive code table:

| Code | Sex | Birth Century | Year Range | Source |
|------|-----|---------------|------------|--------|
| 1 | Male | 20th | 1900-1999 | Official: Art. 14(3.I.a) — "1 pentru persoanele de sex masculin născute între anii 1900-1999" |
| 2 | Female | 20th | 1900-1999 | Official |
| 3 | Male | 19th | 1800-1899 | Official — "3 pentru persoanele de sex masculin născute între anii 1800-1899" |
| 4 | Female | 19th | 1800-1899 | Official |
| 5 | Male | 21st | 2000-2099 | Official — "5 pentru persoanele de sex masculin născute între anii 2000-2099" |
| 6 | Female | 21st | 2000-2099 | Official |
| 7 | Male | Variable (resident) | — | **Secondary** — Romanian residents domiciled abroad |
| 8 | Female | Variable (resident) | — | **Secondary** — Romanian residents domiciled abroad |
| 9 | N/A ("not applicable") | 20th (19xx) | — | **Secondary** — Foreign nationals, stateless persons, or persons under protection |

**Important:** Codes 1-6 are the only sex codes defined in the official law (HG 1375/2006, Art. 14). Codes 7, 8, and 9 are established by administrative practice and referenced in secondary sources (vimishor/cnp-spec, Wikipedia RO, SPIROS documentation).

**Output mapping** (ISO/IEC 5218-like):
- Codes 1, 3, 5, 7 → `"male"`
- Codes 2, 4, 6, 8 → `"female"`
- Code 9 → `"not applicable"`
- Any invalid code → `"not known"`

### Century resolution for codes 7-8 (resident logic):

For codes 7 and 8, the century is determined dynamically against the current year:
- If `AA` (birth year last 2 digits) ≤ current year's last 2 digits → century = 21st (`20xx`)
- If `AA` > current year's last 2 digits → century = 20th (`19xx`)

This resolves ambiguity since codes 7-8 don't have a fixed century.

### Code 9 century:

Code 9 always maps to century 20th (`19xx`), consistent with foreign nationals born after 1900.

---

## 4. Component AALLZZ — Birth Date

### Format:
- `AA` = Last 2 digits of birth year (extracted directly from CNP positions 2-3)
- `LL` = Month (01-12)
- `ZZ` = Day (01-31, must be valid for the given month, including leap years)

**Source:** HG 1375/2006, Art. 14(3.I.b). Official.

### Resolution rule:
1. Determine the century from code S (see section 3).
2. Prepend century to AA to form the full 4-digit year.
3. Validate that the resulting date is a real calendar date.

### Valid date range:
- Minimum: 1800-01-01 (codes 3/4, 18th century births)
- Maximum: 2099-12-31 (codes 5/6, 21st century births)
- Future dates relative to today may still be valid if within range.
- Codes 7/8: date range is effectively 1900 to current year + ~100 years.

**Source:** Derived from century mappings; not explicitly stated in law.

---

## 5. Component JJ — County Code

### Complete county table:

| Code | ISO | Name | Temporal Validity |
|------|-----|------|-------------------|
| 01 | AB | Alba | Always |
| 02 | AR | Arad | Always |
| 03 | AG | Argeș | Always |
| 04 | BC | Bacău | Always |
| 05 | BH | Bihor | Always |
| 06 | BN | Bistrița-Năsăud | Always |
| 07 | BT | Botoșani | Always |
| 08 | BV | Brașov | Always |
| 09 | BR | Brăila | Always |
| 10 | BZ | Buzău | Always |
| 11 | CS | Caraș-Severin | Always |
| 12 | CJ | Cluj | Always |
| 13 | CT | Constanța | Always |
| 14 | CV | Covasna | Always |
| 15 | DB | Dâmbovița | Always |
| 16 | DJ | Dolj | Always |
| 17 | GL | Galați | Always |
| 18 | GJ | Gorj | Always |
| 19 | HR | Harghita | Always |
| 20 | HD | Hunedoara | Always |
| 21 | IL | Ialomița | Always |
| 22 | IS | Iași | Always |
| 23 | IF | Ilfov | Valid from 1968-02-14 (re-established after 1950 administrative reform) |
| 24 | MM | Maramureș | Always |
| 25 | MH | Mehedinți | Always |
| 26 | MS | Mureș | Always |
| 27 | NT | Neamț | Always |
| 28 | OT | Olt | Always |
| 29 | PH | Prahova | Always |
| 30 | SM | Satu Mare | Always |
| 31 | SJ | Sălaj | Always |
| 32 | SB | Sibiu | Always |
| 33 | SV | Suceava | Always |
| 34 | TR | Teleorman | Always |
| 35 | TM | Timiș | Always |
| 36 | TL | Tulcea | Always |
| 37 | VS | Vaslui | Always |
| 38 | VL | Vâlcea | Always |
| 39 | VN | Vrancea | Always |
| 40 | B | București (city-wide) | Always |
| 41 | B | București Sector 1 | Always |
| 42 | B | București Sector 2 | Always |
| 43 | B | București Sector 3 | Always |
| 44 | B | București Sector 4 | Always |
| 45 | B | București Sector 5 | Always |
| 46 | B | București Sector 6 | Always |
| 47 | — | (București Sector 7, historical) | Valid only before 1979-12-19 (abolished) |
| 48 | — | (București Sector 8, historical) | Valid only before 1979-12-19 (abolished) |
| 51 | CL | Călărași | Valid from 1981-02-17 (created by splitting Ialomița) |
| 52 | GR | Giurgiu | Valid from 1981-02-17 (created by splitting Teleorman) |
| 70 | — | Cod unic (unique code for special cases) | Always |

**Note:** Codes 47 and 48 are historical București sectors abolished on 1979-12-19. They exist in the county list with `undefined` ISO and `undefined` name. Codes 51 and 52 were created on 1981-02-17.

**Convention (not law):** Foreign nationals are typically assigned county code 52.

**Source:** County code assignments are listed in administrative regulations (HG 1375/2006 Annex). The specific ISO codes and temporal rules for 47-48, 23, 51-52 are from administrative practice and secondary research.

---

## 6. Component NNN — Serial Number

- A 3-digit sequence number, range **001 to 999**.
- Assigned sequentially per sex, per birth date, per county/district.
- Distinguishes individuals born on the same date and same sex in the same location.

**Source:** HG 1375/2006, Art. 14(3.II.b) — "NNN reprezintă un număr de secvență (între 001 și 999), repartizat pe puncte de atribuire, prin care se diferențiază persoanele de același sex, născute în același loc și cu aceeași dată de naștere (an, lună, zi)." Official.

---

## 7. Component C — Control Digit (Checksum)

### Algorithm:

The checksum is computed as follows:

1. Multiply each of the first 12 digits of the CNP by the corresponding digit in the constant key:

```
Key:  2 7 9 1 4 6 3 5 8 2 7 9
Pos:  1 2 3 4 5 6 7 8 9 10 11 12
```

2. Sum all 12 products.
3. Compute `sum % 11` (modulo 11).
4. If the remainder is 10, the control digit is **1**.
5. Otherwise, the control digit is the remainder itself (0-9).

### Checksum constant:

```
279146358279
```

**Source:** The checksum algorithm with constant `279146358279` is **not specified** in HG 1375/2006. The law states only that "o cifră de control (C) atribuită de calculator, care permite depistarea eventualelor erori de înlocuire sau inversare a cifrelor" (Art. 14(3.III)). The algorithm is universally documented in secondary sources (vimishor/cnp-spec, Wikipedia RO, SPIROS documentation) and matches all known production CNP implementations.

### Special case:
- If `sum % 11 == 10`, the resulting checksum digit is 1 (not 10 — the control digit is only 1 digit).

---

## 8. Complete Validation Rules

A CNP is valid if and only if **all** of the following hold:

| # | Rule | Component | Description |
|---|------|-----------|-------------|
| 1 | Format | All | Exactly 13 ASCII numeric digits (0-9) |
| 2 | Sex code | S | Code S must be one of 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| 3 | Birth date | AALLZZ | Must resolve to a valid calendar date (accounting for leap years, month lengths) |
| 4 | Date range | AALLZZ | The resolved date must fall within the century defined by code S |
| 5 | County exists | JJ | Code JJ must be in the recognized county list (01-52, 70) |
| 6 | County temporal | JJ | Code 47/48 only valid for dates before 1979-12-19; code 51/52 only valid from 1981-02-17; code 23 only valid from 1968-02-14 |
| 7 | Serial range | NNN | Must be between 001 and 999 |
| 8 | Checksum | C | Must match the computed control digit using the `279146358279` algorithm |

---

## 9. Implementation Notes

### Century determination (codes 7-8):
Codes 7-8 are for Romanian citizens with domicile abroad. Since they don't have a fixed century, the century is determined by comparing `AA` to the current year's last 2 digits. This is an algorithmic convention, not specified in law.

### County 52 for foreign nationals:
Code 52 (Giurgiu) is commonly used as the county code for foreign nationals born abroad. This is a well-known convention but is not codified in the law. The code does not and should not enforce this convention.

### County 70:
Code 70 ("Cod unic") is a special code for certain administrative cases. It has no ISO code.

### "Unknown" county handling:
For unrecognized county codes, implementations should return `name: "Unknown"` and `ISO: "XX"` to distinguish from successfully parsed counties.

---

## 10. Source References

| Reference | Description | Contains CNP Spec? |
|-----------|-------------|-------------------|
| OUG 97/2005 | Emergency Ordinance on civil status records | Yes (legal framework only) |
| HG 1375/2006, Art. 14 | Norme Metodologice — official technical spec | **Yes** — SAALLZZJJNNNC, sex codes 1-6, date format, county, serial 001-999, control digit exists |
| HG 1375/2006, Art. 15 | Conditions for reassigning CNP | Yes (reassignment rules) |
| Wikipedia RO "Cod numeric personal" | Community-maintained reference | Yes (secondary, includes 7-9, checksum algorithm) |
| vimishor/cnp-spec (GitHub) | Unofficial spec widely used by developers | Yes (secondary, practical reference) |
| SPIROS / DEPABD documentation | Internal administrative procedure | Likely (secondary, not publicly obtained) |

---

*Document created from consolidated research: GOVERNMENT_SOURCES_ANALYSIS.md, IMPLEMENTATION_REGULATIONS_FOUND.md, OFFICIAL_NORME_METODOLOGICE_ANALYSIS.md, FINAL_COMPLIANCE_REPORT.md, FINAL_SOURCES_SUMMARY.md, and raw legislation extracts from legislatie.just.ro.*
