import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setTranscript('');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate transcription
    setTimeout(() => {
      setTranscript("Comment puis-je optimiser mon budget mensuel pour économiser 500€ de plus ?");
    }, 1000);
  };

  const handleSubmit = () => {
    if (transcript) {
      onSubmit(transcript);
      onClose();
      setTranscript('');
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card rounded-2xl p-8 m-4 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Enregistrement vocal
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                Posez votre question financière à voix haute
              </p>

              {/* Waveform Visualization */}
              <div className="flex items-center justify-center h-20 mb-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full mx-0.5"
                    animate={{
                      height: isRecording ? Math.random() * 60 + 10 : 4,
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: isRecording ? Infinity : 0,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {!isRecording ? (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={startRecording}
                    iconName="Mic"
                    iconPosition="left"
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    Commencer
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={stopRecording}
                    iconName="Square"
                    iconPosition="left"
                  >
                    Arrêter
                  </Button>
                )}
              </div>

              {/* Recording Time */}
              {isRecording && (
                <div className="text-sm text-muted-foreground mb-4">
                  <Icon name="Clock" size={16} className="inline mr-1" />
                  {formatTime(recordingTime)}
                </div>
              )}

              {/* Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-lg p-4 mb-6"
                >
                  <p className="text-sm text-foreground italic">
                    "{transcript}"
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Annuler
                </Button>
                {transcript && (
                  <Button
                    variant="default"
                    onClick={handleSubmit}
                    className="flex-1"
                    iconName="Send"
                    iconPosition="right"
                  >
                    Analyser
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceInputModal;