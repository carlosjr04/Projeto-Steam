import { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';

interface MultiSelectOption {
  [key: string]: string | number;
}

interface MultiSelectDropdownProps<T extends MultiSelectOption> {
  options: T[];
  selected: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  labelKey: keyof T;
  valueKey: keyof T;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelectDropdown<T extends MultiSelectOption>({
  options,
  selected,
  onChange,
  labelKey,
  valueKey,
  placeholder = 'Selecione...',
  disabled = false,
}: MultiSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  const handleOptionClick = (optionValue: string | number) => {
    const isSelected = selected.includes(optionValue);
    const newSelected = isSelected
      ? selected.filter(item => item !== optionValue)
      : [...selected, optionValue];
    onChange(newSelected);
  };

  const displaySelectedText = selected.length === 0
    ? placeholder
    : selected
        .map(sel => {
          const found = options.find(opt => String(opt[valueKey]) === String(sel));
          return found ? found[labelKey] : sel;
        })
        .join(', ');

  return (
    <div className={styles['dropdown-container']} ref={dropdownRef}>
      <div
        className={`${styles['dropdown-header']} ${disabled ? styles['disabled'] : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <span className={styles['selected-text']}>
          {displaySelectedText}
        </span>
        <span className={styles['dropdown-arrow']}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {isOpen && (
        <div className={styles['dropdown-options']} role="listbox">
          {options.length === 0 ? (
            <div className={styles['no-options']}>Nenhuma opção disponível.</div>
          ) : (
            options.map(opt => {
              const optionValue = opt[valueKey];
              const isSelected = selected.includes(optionValue);
              return (
                <div
                  key={optionValue}
                  className={`${styles['dropdown-option']} ${isSelected ? styles['selected'] : ''}`}
                  onClick={() => handleOptionClick(optionValue)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={styles['checkbox']}>{isSelected ? '✔' : ''}</span>
                  <span className={styles['option-label']}>{opt[labelKey]}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}