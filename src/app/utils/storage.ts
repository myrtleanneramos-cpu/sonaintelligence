// SONA Intelligence - Local Storage Manager

import { STORAGE_KEYS } from '../constants/app';
import type { Strategy, Trade, AppSettings, Alert } from '../types';

/**
 * Safe localStorage wrapper with error handling
 */
class StorageManager {
  /**
   * Get item from localStorage with type safety
   */
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  /**
   * Set item in localStorage with error handling
   */
  private setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  private removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }

  // API Key Management
  getApiKey(): string | null {
    return localStorage.getItem(STORAGE_KEYS.API_KEY);
  }

  setApiKey(key: string): boolean {
    return this.setItem(STORAGE_KEYS.API_KEY, key);
  }

  removeApiKey(): boolean {
    return this.removeItem(STORAGE_KEYS.API_KEY);
  }

  // Strategies Management
  getStrategies(): Strategy[] {
    return this.getItem<Strategy[]>(STORAGE_KEYS.STRATEGIES, []);
  }

  addStrategy(strategy: Omit<Strategy, 'id' | 'createdAt'>): boolean {
    const strategies = this.getStrategies();
    const newStrategy: Strategy = {
      ...strategy,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    strategies.push(newStrategy);
    return this.setItem(STORAGE_KEYS.STRATEGIES, strategies);
  }

  updateStrategy(id: string, updates: Partial<Strategy>): boolean {
    const strategies = this.getStrategies();
    const index = strategies.findIndex((s) => s.id === id);
    if (index === -1) return false;

    strategies[index] = { ...strategies[index], ...updates };
    return this.setItem(STORAGE_KEYS.STRATEGIES, strategies);
  }

  deleteStrategy(id: string): boolean {
    const strategies = this.getStrategies();
    const filtered = strategies.filter((s) => s.id !== id);
    return this.setItem(STORAGE_KEYS.STRATEGIES, filtered);
  }

  // Trades Management
  getTrades(): Trade[] {
    return this.getItem<Trade[]>(STORAGE_KEYS.TRADES, []);
  }

  addTrade(trade: Omit<Trade, 'id' | 'timestamp'>): boolean {
    const trades = this.getTrades();
    const newTrade: Trade = {
      ...trade,
      id: `trade_${Date.now()}`,
      timestamp: Date.now(),
    };
    trades.unshift(newTrade); // Add to beginning
    return this.setItem(STORAGE_KEYS.TRADES, trades);
  }

  updateTrade(id: string, updates: Partial<Trade>): boolean {
    const trades = this.getTrades();
    const index = trades.findIndex((t) => t.id === id);
    if (index === -1) return false;

    trades[index] = { ...trades[index], ...updates };
    return this.setItem(STORAGE_KEYS.TRADES, trades);
  }

  deleteTrade(id: string): boolean {
    const trades = this.getTrades();
    const filtered = trades.filter((t) => t.id !== id);
    return this.setItem(STORAGE_KEYS.TRADES, filtered);
  }

  getActiveTrades(): Trade[] {
    return this.getTrades().filter((t) => t.status === 'active');
  }

  // Settings Management
  getSettings(): AppSettings {
    return this.getItem<AppSettings>(STORAGE_KEYS.SETTINGS, {
      slippageTolerance: 0.5,
      riskTolerance: 'medium',
      autoRefresh: true,
      notifications: true,
      darkMode: true,
    });
  }

  updateSettings(updates: Partial<AppSettings>): boolean {
    const settings = this.getSettings();
    const newSettings = { ...settings, ...updates };
    return this.setItem(STORAGE_KEYS.SETTINGS, newSettings);
  }

  // Clear All Data
  clearAll(): boolean {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Export Data
  exportData(): string {
    const data = {
      strategies: this.getStrategies(),
      trades: this.getTrades(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  // Import Data
  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.strategies) this.setItem(STORAGE_KEYS.STRATEGIES, data.strategies);
      if (data.trades) this.setItem(STORAGE_KEYS.TRADES, data.trades);
      if (data.settings) this.setItem(STORAGE_KEYS.SETTINGS, data.settings);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Statistics
  getStats() {
    const trades = this.getTrades();
    const activeTrades = trades.filter((t) => t.status === 'active');
    const closedTrades = trades.filter((t) => t.status === 'closed');

    const totalPnL = closedTrades.reduce((sum, trade) => {
      const pnl = parseFloat(trade.currentPrice) - parseFloat(trade.entryPrice);
      return sum + pnl;
    }, 0);

    const winningTrades = closedTrades.filter((trade) => {
      return parseFloat(trade.currentPrice) > parseFloat(trade.entryPrice);
    });

    return {
      totalTrades: trades.length,
      activeTrades: activeTrades.length,
      closedTrades: closedTrades.length,
      totalPnL,
      winRate: closedTrades.length > 0 
        ? (winningTrades.length / closedTrades.length) * 100 
        : 0,
      averageScore: trades.length > 0
        ? trades.reduce((sum, t) => sum + t.score, 0) / trades.length
        : 0,
    };
  }
}

// Export singleton instance
export const storage = new StorageManager();

// Export individual functions for convenience
export const {
  getApiKey,
  setApiKey,
  removeApiKey,
  getStrategies,
  addStrategy,
  updateStrategy,
  deleteStrategy,
  getTrades,
  addTrade,
  updateTrade,
  deleteTrade,
  getActiveTrades,
  getSettings,
  updateSettings,
  clearAll,
  exportData,
  importData,
  getStats,
} = storage;
