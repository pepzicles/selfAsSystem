int percent = 0;
int prevPercent = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  percent = int(round(analogRead(0) / 1024.00 * 100));
  if (percent != prevPercent){
    Serial.print("[");
    Serial.print(40);
    Serial.print(", ");
    Serial.print(percent);
    Serial.print(", ");
    Serial.print(percent);
    Serial.print(", ");
    Serial.print(percent);
    Serial.print(", ");
    Serial.print(percent);
    Serial.println("]");
    prevPercent = percent;
  }
  delay(10);
}
