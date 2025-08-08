/**
 * 🎯 FASE 3.2.3 - Performance Dashboard Component
 * Dashboard interactivo para visualizar métricas de performance y Web Vitals
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  usePerformanceMetrics, 
  useCoreWebVitals, 
  useMemoryMetrics, 
  useNetworkMetrics,
  usePerformanceAlerts 
} from '../hooks/usePerformanceMetrics';
import './PerformanceDashboard.css';

/**
 * Componente principal del dashboard
 */
const PerformanceDashboard = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('vitals');
  const [isMinimized, setIsMinimized] = useState(false);
  
  const { vitals, score, status } = useCoreWebVitals();
  const { metrics, getFullReport } = usePerformanceMetrics();
  const { memoryInfo, isHighUsage } = useMemoryMetrics();
  const { networkInfo, connectionQuality } = useNetworkMetrics();
  const { alerts, hasAlerts } = usePerformanceAlerts();

  // Memoizar callbacks para evitar re-renders innecesarios
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleToggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`performance-dashboard ${isMinimized ? 'minimized' : ''}`}>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <span className="dashboard-icon">📊</span>
          Performance Monitor
          {hasAlerts && <span className="alert-badge">{alerts.length}</span>}
        </div>
        <div className="dashboard-controls">
          <button 
            className="minimize-btn"
            onClick={handleToggleMinimize}
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? '📈' : '📉'}
          </button>
          <button 
            className="close-btn"
            onClick={handleClose}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="dashboard-tabs">
            <button 
              className={`tab ${activeTab === 'vitals' ? 'active' : ''}`}
              onClick={() => handleTabChange('vitals')}
            >
              Core Vitals
            </button>
            <button 
              className={`tab ${activeTab === 'system' ? 'active' : ''}`}
              onClick={() => handleTabChange('system')}
            >
              System
            </button>
            <button 
              className={`tab ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => handleTabChange('alerts')}
            >
              Alerts {hasAlerts && `(${alerts.length})`}
            </button>
            <button 
              className={`tab ${activeTab === 'report' ? 'active' : ''}`}
              onClick={() => handleTabChange('report')}
            >
              Report
            </button>
          </div>

          <div className="dashboard-content">
            {activeTab === 'vitals' && (
              <CoreVitalsTab vitals={vitals} score={score} status={status} />
            )}
            {activeTab === 'system' && (
              <SystemTab memoryInfo={memoryInfo} networkInfo={networkInfo} connectionQuality={connectionQuality} />
            )}
            {activeTab === 'alerts' && (
              <AlertsTab alerts={alerts} />
            )}
            {activeTab === 'report' && (
              <ReportTab getFullReport={getFullReport} metrics={metrics} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Tab de Core Web Vitals
 */
const CoreVitalsTab = ({ vitals, score, status }) => {
  const getStatusIcon = (rating) => {
    switch (rating) {
      case 'good': return '✅';
      case 'needs-improvement': return '⚠️';
      case 'poor': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (rating) => {
    switch (rating) {
      case 'good': return 'green';
      case 'needs-improvement': return 'orange';
      case 'poor': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="vitals-tab">
      <div className="score-container">
        <div className={`score-circle ${status}`}>
          <div className="score-value">{score}</div>
          <div className="score-label">Score</div>
        </div>
        <div className="score-status">
          <div className={`status-indicator ${status}`}></div>
          <span>Status: {status.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="vitals-grid">
        {Object.entries(vitals).map(([key, vital]) => (
          <div key={key} className={`vital-card ${vital?.rating || 'pending'}`}>
            <div className="vital-header">
              <span className="vital-icon">{getStatusIcon(vital?.rating)}</span>
              <span className="vital-name">{key}</span>
            </div>
            <div className="vital-value">
              {vital ? (
                <>
                  <span className="value">{vital.value.toFixed(key === 'CLS' ? 3 : 0)}</span>
                  <span className="unit">{key === 'CLS' ? '' : 'ms'}</span>
                </>
              ) : (
                <span className="pending">Pending...</span>
              )}
            </div>
            {vital && (
              <div className={`vital-rating ${vital.rating}`}>
                {vital.rating.replace('-', ' ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Tab de información del sistema
 */
const SystemTab = ({ memoryInfo, networkInfo, connectionQuality }) => {
  return (
    <div className="system-tab">
      <div className="system-section">
        <h3>Memory Usage</h3>
        {memoryInfo ? (
          <div className="memory-info">
            <div className="memory-bar">
              <div 
                className="memory-usage"
                style={{ width: `${memoryInfo.usagePercentage}%` }}
              ></div>
            </div>
            <div className="memory-stats">
              <div>Used: {memoryInfo.used} MB</div>
              <div>Total: {memoryInfo.total} MB</div>
              <div>Limit: {memoryInfo.limit} MB</div>
              <div>Usage: {memoryInfo.usagePercentage}%</div>
            </div>
          </div>
        ) : (
          <div className="not-supported">Memory API not supported</div>
        )}
      </div>

      <div className="system-section">
        <h3>Network Connection</h3>
        {networkInfo ? (
          <div className="network-info">
            <div className={`connection-quality ${connectionQuality || 'unknown'}`}>
              <div className="quality-indicator"></div>
              <span>{(connectionQuality || 'unknown').toUpperCase()}</span>
            </div>
            <div className="network-stats">
              <div>Type: {networkInfo.effectiveType}</div>
              <div>Downlink: {networkInfo.downlink} Mbps</div>
              <div>RTT: {networkInfo.rtt} ms</div>
              {networkInfo.saveData && <div className="save-data">Data Saver: ON</div>}
            </div>
          </div>
        ) : (
          <div className="not-supported">Network API not supported</div>
        )}
      </div>
    </div>
  );
};

/**
 * Tab de alertas
 */
const AlertsTab = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="alerts-tab">
        <div className="no-alerts">
          <span className="success-icon">🎉</span>
          <h3>No Performance Issues</h3>
          <p>All metrics are within acceptable ranges!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts-tab">
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert-item ${alert.type}`}>
            <div className="alert-header">
              <span className="alert-icon">
                {alert.type === 'error' ? '❌' : '⚠️'}
              </span>
              <span className="alert-metric">{alert.metric}</span>
            </div>
            <div className="alert-message">{alert.message}</div>
            <div className="alert-recommendation">{alert.recommendation}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Tab de reporte
 */
const ReportTab = ({ getFullReport, metrics }) => {
  const [report, setReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const fullReport = getFullReport();
      setReport(fullReport);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = () => {
    if (!report) return;
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  useEffect(() => {
    if (Object.keys(metrics).length > 0) {
      generateReport();
    }
  }, [metrics]);

  return (
    <div className="report-tab">
      <div className="report-actions">
        <button onClick={generateReport} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Refresh Report'}
        </button>
        <button onClick={exportReport} disabled={!report}>
          Export JSON
        </button>
      </div>

      {report && (
        <div className="report-content">
          <div className="report-section">
            <h3>Summary</h3>
            <div className="summary-stats">
              <div>Core Vitals Score: {report.summary.coreVitalsScore}/100</div>
              <div>Total Metrics: {report.summary.totalMetrics}</div>
              <div>Good Metrics: {report.summary.goodMetrics}</div>
              <div>Poor Metrics: {report.summary.poorMetrics}</div>
            </div>
          </div>

          {report.recommendations.length > 0 && (
            <div className="report-section">
              <h3>Recommendations</h3>
              <ul className="recommendations">
                {report.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="report-section">
            <h3>Current Metrics</h3>
            <div className="metrics-table">
              {Object.entries(report.current).map(([key, metric]) => (
                <div key={key} className="metric-row">
                  <span className="metric-name">{key}</span>
                  <span className="metric-value">{metric.value.toFixed(2)}</span>
                  <span className={`metric-rating ${metric.rating}`}>{metric.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;
