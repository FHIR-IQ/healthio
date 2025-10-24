'use client';

import { mockPatient, Patient } from './mock-data/patient';

// Mock SDK that simulates FHIR Platform interactions
// In reality, this would make API calls to the FHIR Platform Gateway

export class FHIRPlatformSDK {
  private patient: Patient | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  // Initialize SDK with patient context
  async initialize(patientId?: string): Promise<void> {
    // Simulate API delay
    await this.delay(800);
    this.patient = mockPatient;
    this.emit('patientLoaded', this.patient);
  }

  // Get patient summary (no FHIR knowledge needed!)
  async getPatientSummary() {
    await this.delay(500);
    if (!this.patient) throw new Error('SDK not initialized');

    return {
      name: this.patient.name,
      age: this.patient.age,
      gender: this.patient.gender,
      conditions: this.patient.conditions,
      medications: this.patient.medications,
      allergies: this.patient.allergies
    };
  }

  // Get vital signs
  async getVitalSigns() {
    await this.delay(400);
    if (!this.patient) throw new Error('SDK not initialized');
    return this.patient.vitalSigns;
  }

  // Get lab results
  async getLabResults() {
    await this.delay(600);
    if (!this.patient) throw new Error('SDK not initialized');
    return this.patient.labResults;
  }

  // Get upcoming appointments
  async getAppointments() {
    await this.delay(450);
    if (!this.patient) throw new Error('SDK not initialized');
    return this.patient.appointments;
  }

  // Get connected data holders
  async getDataHolders() {
    await this.delay(350);
    if (!this.patient) throw new Error('SDK not initialized');
    return this.patient.dataHolders;
  }

  // Subscribe to real-time events
  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  // Unsubscribe from events
  off(event: string, callback: (data: any) => void) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  // Emit events (internal)
  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }

  // Simulate new lab result event (for demo)
  async simulateNewLabResult() {
    await this.delay(1000);
    const newLab = {
      id: Date.now().toString(),
      test: "Vitamin D",
      value: "32 ng/mL",
      date: new Date().toISOString().split('T')[0],
      status: "normal"
    };

    if (this.patient) {
      this.patient.labResults.unshift(newLab);
      this.emit('newLabResult', newLab);
    }
  }

  // Helper to simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const fhirSDK = new FHIRPlatformSDK();
