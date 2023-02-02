import React, { useState } from 'react';
import { Section } from './Section/Section';
import { Feedback } from './Feedback/Feedback';
import { Statistic } from './Statistic/Statistic';
import { Notification } from './Notification/Notification';

export function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const feedBackOptions = { good, neutral, bad };

    const handleFeedback = e => {
        const { name } = e.target;
        switch (name) {
            case 'good':
                setGood(prev => prev + 1);
                break;
            case 'neutral':
                setNeutral(prev => prev + 1);
                break;
            case 'bad':
                setBad(prev => prev + 1);
                break;
            default:
                return;
        }
    };

    const totalFeedback = () => {
        return good + neutral + bad;
    };

    const positivePercentage = () => {
        if (totalFeedback() === 0) {
            return 0;
        }
        return Math.round((good / totalFeedback()) * 100);
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 40,
                color: '#010101',
            }}
        >
            <Section title="Please leave feedback">
                <Feedback
                    options={Object.keys(feedBackOptions)}
                    onFeedback={handleFeedback}
                />
            </Section>

            <Section title="Statistics">
                {totalFeedback() !== 0 ? (
                    <Statistic
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={totalFeedback()}
                        positiveFeed={positivePercentage()}
                    />
                ) : (
                    <Notification warningText="There is no feedback" />
                )}
            </Section>
        </div>
    );
}
